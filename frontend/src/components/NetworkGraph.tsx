import { useRef, useEffect, useState } from "react";
import { NetworkNode, NetworkEdge } from "@/lib/types";

interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData]     = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/network")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d: NetworkData) => setData(d))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    const scaleX = (x: number) => (x / 800) * w;
    const scaleY = (y: number) => (y / 550) * h;

    const riskColors: Record<string, string> = {
      critical: "#ef4444",
      high:     "#f97316",
      medium:   "#eab308",
      low:      "#22c55e",
    };

    // Draw edges
    data.edges.forEach((edge) => {
      const fromNode = data.nodes.find((n) => n.id === edge.from);
      const toNode   = data.nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;

      const x1 = scaleX(fromNode.x);
      const y1 = scaleY(fromNode.y);
      const x2 = scaleX(toNode.x);
      const y2 = scaleY(toNode.y);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = edge.suspicious ? "rgba(239, 68, 68, 0.6)" : "rgba(100, 116, 139, 0.25)";
      ctx.lineWidth   = edge.suspicious ? 2 : 1;
      if (edge.suspicious) ctx.setLineDash([6, 4]);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow
      const angle   = Math.atan2(y2 - y1, x2 - x1);
      const arrowLen = 10;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(midX - arrowLen * Math.cos(angle - Math.PI / 6), midY - arrowLen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(midX, midY);
      ctx.lineTo(midX - arrowLen * Math.cos(angle + Math.PI / 6), midY - arrowLen * Math.sin(angle + Math.PI / 6));
      ctx.strokeStyle = edge.suspicious ? "rgba(239, 68, 68, 0.8)" : "rgba(100, 116, 139, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw nodes
    data.nodes.forEach((node) => {
      const x      = scaleX(node.x);
      const y      = scaleY(node.y);
      const radius = node.riskLevel === "critical" ? 24 : node.riskLevel === "high" ? 20 : 16;
      const color  = riskColors[node.riskLevel];

      if (node.riskLevel === "critical") {
        const gradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 2.5);
        gradient.addColorStop(0, color + "30");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle   = color + "20";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth   = 2;
      ctx.stroke();

      ctx.font      = "11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#e2e8f0";
      ctx.textAlign = "center";
      ctx.fillText(node.label, x, y + radius + 16);

      ctx.font      = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(node.id, x, y + 4);
    });
  }, [data]);

  return (
    <div className="glass-panel rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Network Analysis</h3>
        <div className="flex gap-3 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-risk-critical" /> Critical</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-risk-high" /> High</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-risk-low" /> Low</span>
          <span className="flex items-center gap-1 text-risk-critical">--- Suspicious</span>
        </div>
      </div>
      {loading && (
        <div className="w-full h-[400px] flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground animate-pulse">Loading network…</span>
        </div>
      )}
      {error && (
        <div className="w-full h-[400px] flex items-center justify-center">
          <span className="font-mono text-xs text-risk-critical">Error: {error}</span>
        </div>
      )}
      {!loading && !error && <canvas ref={canvasRef} className="w-full h-[400px]" />}
    </div>
  );
}
