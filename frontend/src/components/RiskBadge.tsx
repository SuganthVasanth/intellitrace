import { RiskLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const config: Record<RiskLevel, { label: string; classes: string }> = {
  critical: { label: "CRITICAL", classes: "bg-risk-critical/15 text-risk-critical border-risk-critical/30" },
  high: { label: "HIGH", classes: "bg-risk-high/15 text-risk-high border-risk-high/30" },
  medium: { label: "MEDIUM", classes: "bg-risk-medium/15 text-risk-medium border-risk-medium/30" },
  low: { label: "LOW", classes: "bg-risk-low/15 text-risk-low border-risk-low/30" },
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const c = config[level];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase", c.classes, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", level === "critical" && "risk-pulse", {
        "bg-risk-critical": level === "critical",
        "bg-risk-high": level === "high",
        "bg-risk-medium": level === "medium",
        "bg-risk-low": level === "low",
      })} />
      {c.label}
    </span>
  );
}
