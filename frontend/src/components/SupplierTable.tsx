import { useEffect, useState } from "react";
import { Supplier } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";
import { cn } from "@/lib/utils";

export function SupplierTable() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/suppliers")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Supplier[]) => setSuppliers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="glass-panel rounded-lg p-8 text-center">
        <span className="font-mono text-xs text-muted-foreground animate-pulse">Loading suppliers…</span>
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
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Supplier Risk Registry</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Company</th>
              <th className="px-4 py-3 text-left font-medium">GST</th>
              <th className="px-4 py-3 text-left font-medium">Bank Acc</th>
              <th className="px-4 py-3 text-center font-medium">Risk Score</th>
              <th className="px-4 py-3 text-center font-medium">Risk Level</th>
              <th className="px-4 py-3 text-center font-medium">Flags</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s, i) => (
              <tr key={s.id} className={cn("border-b border-border/50 transition-colors hover:bg-accent/50", i % 2 === 0 && "bg-card/30")}>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                <td className="px-4 py-3 font-medium">{s.companyName}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.gstNumber}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.bankAccount}</td>
                <td className="px-4 py-3 text-center">
                  <span className={cn("font-mono font-bold text-sm", {
                    "text-risk-critical": s.riskScore >= 80,
                    "text-risk-high": s.riskScore >= 60 && s.riskScore < 80,
                    "text-risk-medium": s.riskScore >= 30 && s.riskScore < 60,
                    "text-risk-low": s.riskScore < 30,
                  })}>{s.riskScore}</span>
                </td>
                <td className="px-4 py-3 text-center"><RiskBadge level={s.riskLevel} /></td>
                <td className="px-4 py-3 text-center font-mono text-xs">{s.flagCount}</td>
                <td className="px-4 py-3 text-center">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-sm", {
                    "bg-risk-low/10 text-risk-low": s.status === "active",
                    "bg-risk-medium/10 text-risk-medium": s.status === "under_review",
                    "bg-risk-critical/10 text-risk-critical": s.status === "suspended",
                  })}>{s.status.replace("_", " ")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
