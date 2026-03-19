import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertsPanel } from "@/components/AlertsPanel";

const Alerts = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Risk Alerts</h2>
        <p className="text-sm text-muted-foreground mt-1 font-mono">Real-time fraud detection alerts</p>
      </div>
      <AlertsPanel />
    </div>
  </DashboardLayout>
);

export default Alerts;
