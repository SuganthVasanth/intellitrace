import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SupplierTable } from "@/components/SupplierTable";
import { NetworkGraph } from "@/components/NetworkGraph";
import { AlertsPanel } from "@/components/AlertsPanel";
import { MethodologyOverview } from "@/components/MethodologyOverview";
import { Users, AlertTriangle, ShieldAlert, IndianRupee, FileText, Bell } from "lucide-react";

interface DashboardStats {
  totalSuppliers: number;
  highRiskEntities: number;
  fraudCasesDetected: number;
  totalMoneyAtRisk: number;
  invoicesProcessed: number;
  alertsPending: number;
}

const Index = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/dashboard/stats")
        .then((res) => res.json())
        .then((data: DashboardStats) => setStats(data))
        .catch(() => {
          // Fallback values if API is unavailable
          setStats({
            totalSuppliers: 0,
            highRiskEntities: 0,
            fraudCasesDetected: 0,
            totalMoneyAtRisk: 0,
            invoicesProcessed: 0,
            alertsPending: 0,
          });
        });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const s = stats ?? {
    totalSuppliers: "…",
    highRiskEntities: "…",
    fraudCasesDetected: "…",
    totalMoneyAtRisk: 0,
    invoicesProcessed: "…",
    alertsPending: "…",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">FraudShield 360° Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1 font-mono">Real-time supply chain fraud detection · Last scan: 2 min ago</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard title="Total Suppliers"  value={s.totalSuppliers}    icon={Users}       subtitle={`${s.totalSuppliers} monitored`} />
          <KpiCard title="High Risk"        value={s.highRiskEntities}  icon={ShieldAlert} variant="danger"  trend={{ value: "+2 this week",  positive: false }} />
          <KpiCard title="Fraud Cases"      value={s.fraudCasesDetected} icon={AlertTriangle} variant="warning" trend={{ value: "+3 this month", positive: false }} />
          <KpiCard title="Money at Risk"    value={stats ? `₹${(stats.totalMoneyAtRisk / 1000000).toFixed(1)}M` : "…"} icon={IndianRupee} variant="danger" />
          <KpiCard title="Invoices"         value={s.invoicesProcessed} icon={FileText}    subtitle={`${s.invoicesProcessed} processed`} variant="success" />
          <KpiCard title="Pending Alerts"   value={s.alertsPending}     icon={Bell}        variant="warning" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <NetworkGraph />
          </div>
          <AlertsPanel />
        </div>

        <MethodologyOverview />

        <SupplierTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
