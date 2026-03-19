import { invoices } from "@/lib/mock-data";
import { InvoiceFlag } from "@/lib/types";
import { cn } from "@/lib/utils";

const flagLabels: Record<InvoiceFlag, { label: string; color: string }> = {
  duplicate: { label: "DUPLICATE", color: "bg-risk-critical/15 text-risk-critical" },
  inflated: { label: "INFLATED", color: "bg-risk-high/15 text-risk-high" },
  shell_company: { label: "SHELL CO", color: "bg-risk-critical/15 text-risk-critical" },
  circular_trade: { label: "CIRCULAR", color: "bg-chart-5/15 text-chart-5" },
  clean: { label: "CLEAN", color: "bg-risk-low/15 text-risk-low" },
};

function formatCurrency(n: number) {
  if (n >= 1000000) return `₹${(n / 1000000).toFixed(1)}M`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function InvoiceTable() {
  const sorted = [...invoices].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="glass-panel rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Invoice Verification</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">Invoice #</th>
              <th className="px-4 py-3 text-left font-medium">Supplier</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-center font-medium">Risk</th>
              <th className="px-4 py-3 text-left font-medium">Flags</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((inv, i) => (
              <tr key={inv.id} className={cn("border-b border-border/50 transition-colors hover:bg-accent/50", i % 2 === 0 && "bg-card/30")}>
                <td className="px-4 py-3 font-mono text-xs">{inv.invoiceNumber}</td>
                <td className="px-4 py-3 font-medium text-sm">{inv.supplierName}</td>
                <td className="px-4 py-3 text-right font-mono font-medium">{formatCurrency(inv.amount)}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{inv.date}</td>
                <td className="px-4 py-3 text-center">
                  <span className={cn("font-mono font-bold", {
                    "text-risk-critical": inv.riskScore >= 80,
                    "text-risk-high": inv.riskScore >= 60 && inv.riskScore < 80,
                    "text-risk-medium": inv.riskScore >= 30 && inv.riskScore < 60,
                    "text-risk-low": inv.riskScore < 30,
                  })}>{inv.riskScore}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {inv.flags.map((f) => (
                      <span key={f} className={cn("text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm", flagLabels[f].color)}>
                        {flagLabels[f].label}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
