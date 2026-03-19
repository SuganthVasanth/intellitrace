import { DashboardLayout } from "@/components/DashboardLayout";
import { NetworkGraph } from "@/components/NetworkGraph";

const NetworkPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Network Analysis</h2>
        <p className="text-sm text-muted-foreground mt-1 font-mono">Entity relationship graph · Circular trade detection</p>
      </div>
      <NetworkGraph />
    </div>
  </DashboardLayout>
);

export default NetworkPage;
