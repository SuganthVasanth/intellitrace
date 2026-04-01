import { useEffect, useState } from "react";
import { Alert } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";
import { AlertTriangle, Link2, Copy, TrendingUp, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcons = {
  circular_trade:    Link2,
  shell_company:     Building2,
  duplicate_invoice: Copy,
  inflated_amount:   TrendingUp,
  shared_bank:       Building2,
};

export function AlertsPanel() {
  const [alerts, setAlerts]   = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchAlerts = () => {
    fetch("/api/alerts")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Alert[]) => setAlerts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAlerts(); }, []);

  const toggleResolve = async (id: string) => {
    await fetch(`/api/alerts/${id}/resolve`, { method: "PATCH" });
    fetchAlerts(); // re-fetch to update state
  };

  const active = alerts.filter((a) => !a.resolved);

  if (loading) {
    return (
      <div className="glass-panel rounded-lg p-8 text-center">
        <span className="font-mono text-xs text-muted-foreground animate-pulse">Loading alerts…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel rounded-lg p-8 text-center">
        <span className="font-mono text-xs text-risk-critical">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-risk-critical" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Alerts</h3>
        <span className="ml-auto text-xs font-mono bg-risk-critical/15 text-risk-critical px-2 py-0.5 rounded-sm">{active.length}</span>
      </div>
      <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto">
        {alerts.map((alert) => {
          const Icon = typeIcons[alert.type];
          return (
            <div
              key={alert.id}
              className={cn("p-4 transition-colors hover:bg-accent/30 cursor-pointer", alert.resolved && "opacity-50")}
              onClick={() => toggleResolve(alert.id)}
              title={alert.resolved ? "Click to unresolve" : "Click to resolve"}
            >
              <div className="flex items-start gap-3">
                <div className={cn("rounded-md p-1.5 mt-0.5", {
                  "bg-risk-critical/10 text-risk-critical": alert.severity === "critical",
                  "bg-risk-high/10 text-risk-high":         alert.severity === "high",
                  "bg-risk-medium/10 text-risk-medium":     alert.severity === "medium",
                })}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <RiskBadge level={alert.severity} />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {alert.resolved && <span className="text-[10px] font-mono text-risk-low">RESOLVED</span>}
                  </div>
                  <p className="text-sm leading-snug">{alert.message}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{alert.entityId} · {alert.entityName}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
