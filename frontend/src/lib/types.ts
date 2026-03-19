export type RiskLevel = "critical" | "high" | "medium" | "low";

export interface Supplier {
  id: string;
  companyName: string;
  gstNumber: string;
  bankAccount: string;
  phone: string;
  address: string;
  riskScore: number;
  riskLevel: RiskLevel;
  flagCount: number;
  status: "active" | "suspended" | "under_review";
  registeredDate: string;
}

export interface Invoice {
  id: string;
  supplierId: string;
  supplierName: string;
  amount: number;
  date: string;
  invoiceNumber: string;
  flags: InvoiceFlag[];
  riskScore: number;
}

export type InvoiceFlag = "duplicate" | "inflated" | "shell_company" | "circular_trade" | "clean";

export interface Transaction {
  from: string;
  to: string;
  amount: number;
  date: string;
}

export interface Alert {
  id: string;
  type: "duplicate_invoice" | "shell_company" | "circular_trade" | "inflated_amount" | "shared_bank";
  severity: RiskLevel;
  message: string;
  entityId: string;
  entityName: string;
  timestamp: string;
  resolved: boolean;
}

export interface NetworkNode {
  id: string;
  label: string;
  riskLevel: RiskLevel;
  x: number;
  y: number;
}

export interface NetworkEdge {
  from: string;
  to: string;
  amount: number;
  suspicious: boolean;
}
