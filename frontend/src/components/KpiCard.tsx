import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "danger" | "warning" | "success";
}

export function KpiCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: KpiCardProps) {
  return (
    <div className={cn(
      "glass-panel rounded-lg p-5 animate-slide-in",
      variant === "danger" && "border-risk-critical/20",
      variant === "warning" && "border-risk-high/20",
      variant === "success" && "border-risk-low/20",
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold font-mono tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs font-medium font-mono", trend.positive ? "text-risk-low" : "text-risk-critical")}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn(
          "rounded-md p-2",
          variant === "danger" ? "bg-risk-critical/10 text-risk-critical" :
          variant === "warning" ? "bg-risk-high/10 text-risk-high" :
          variant === "success" ? "bg-risk-low/10 text-risk-low" :
          "bg-primary/10 text-primary"
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
