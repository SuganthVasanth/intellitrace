import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SupplierTable } from "@/components/SupplierTable";
import { NetworkGraph } from "@/components/NetworkGraph";
import { AlertsPanel } from "@/components/AlertsPanel";
import { MethodologyOverview } from "@/components/MethodologyOverview";
import { dashboardStats } from "@/lib/mock-data";
import { Users, AlertTriangle, ShieldAlert, IndianRupee, FileText, Bell } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">FraudShield 360° Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1 font-mono">Real-time supply chain fraud detection · Last scan: 2 min ago</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard title="Total Suppliers" value={dashboardStats.totalSuppliers} icon={Users} subtitle="12 monitored" />
          <KpiCard title="High Risk" value={dashboardStats.highRiskEntities} icon={ShieldAlert} variant="danger" trend={{ value: "+2 this week", positive: false }} />
          <KpiCard title="Fraud Cases" value={dashboardStats.fraudCasesDetected} icon={AlertTriangle} variant="warning" trend={{ value: "+3 this month", positive: false }} />
          <KpiCard title="Money at Risk" value={`₹${(dashboardStats.totalMoneyAtRisk / 1000000).toFixed(1)}M`} icon={IndianRupee} variant="danger" />
          <KpiCard title="Invoices" value={dashboardStats.invoicesProcessed} icon={FileText} subtitle="156 processed" variant="success" />
          <KpiCard title="Pending Alerts" value={dashboardStats.alertsPending} icon={Bell} variant="warning" />
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
