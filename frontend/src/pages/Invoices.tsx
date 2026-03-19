import { DashboardLayout } from "@/components/DashboardLayout";
import { InvoiceTable } from "@/components/InvoiceTable";

const Invoices = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Invoice Authentication</h2>
        <p className="text-sm text-muted-foreground mt-1 font-mono">AI-powered duplicate, shell company & inflation detection</p>
      </div>
      <InvoiceTable />
    </div>
  </DashboardLayout>
);

export default Invoices;
