import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, FileText, Network, AlertTriangle, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "@/hooks/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/suppliers", icon: Users, label: "Suppliers" },
  { to: "/invoices", icon: FileText, label: "Invoices" },
  { to: "/network", icon: Network, label: "Network" },
  { to: "/alerts", icon: AlertTriangle, label: "Alerts" },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [alertCount, setAlertCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/dashboard/stats")
        .then((res) => res.json())
        .then((data) => setAlertCount(data.alertsPending))
        .catch(() => setAlertCount(null));
    };

    fetchStats();
    // Refresh every 30 seconds to keep the badge current
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

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
              {item.label === "Alerts" && alertCount !== null && alertCount > 0 && (
                <span className="ml-auto text-[10px] font-mono bg-risk-critical/15 text-risk-critical px-1.5 py-0.5 rounded-sm">
                  {alertCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-3">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-8 w-8 border border-sidebar-border">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback className="text-[10px]">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-xs">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="px-2 text-center">
             <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Guest Access</p>
          </div>
        )}

        <div className="glass-panel rounded-md p-3 mt-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full risk-pulse", alertCount && alertCount > 0 ? "bg-risk-high" : "bg-risk-low")} />
            <span className={cn("text-xs font-medium", alertCount && alertCount > 0 ? "text-risk-high" : "text-risk-low")}>
              {alertCount && alertCount > 0 ? "Action Required" : "Monitoring Active"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
