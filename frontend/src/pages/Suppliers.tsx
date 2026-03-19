import { DashboardLayout } from "@/components/DashboardLayout";
import { SupplierTable } from "@/components/SupplierTable";

const Suppliers = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Supplier Risk Register</h2>
        <p className="text-sm text-muted-foreground mt-1 font-mono">Real-time risk scoring & fraud probability analysis</p>
      </div>
      <SupplierTable />
    </div>
  </DashboardLayout>
);

export default Suppliers;
