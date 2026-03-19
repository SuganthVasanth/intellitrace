import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Network, AlertTriangle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/suppliers", icon: Users, label: "Suppliers" },
  { to: "/invoices", icon: FileText, label: "Invoices" },
  { to: "/network", icon: Network, label: "Network" },
  { to: "/alerts", icon: AlertTriangle, label: "Alerts" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-primary/15 flex items-center justify-center">
            <Shield className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">FraudShield 360°</h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Real-time Detection</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}>
              <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
              {item.label}
              {item.label === "Alerts" && (
                <span className="ml-auto text-[10px] font-mono bg-risk-critical/15 text-risk-critical px-1.5 py-0.5 rounded-sm">5</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-panel rounded-md p-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-risk-low risk-pulse" />
            <span className="text-xs text-risk-low font-medium">Monitoring Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
