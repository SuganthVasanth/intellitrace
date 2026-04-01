/**
 * db.js — JSON file-based persistence layer
 * Replaces SQLite so no native compilation is required.
 * All data is stored in ./intellitrace.json
 */

const fs   = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "intellitrace.json");

// ── Seed data (mirrors original mock-data.ts exactly) ──────────────────────
const SEED = {
  suppliers: [
    { id: "S001", companyName: "Apex Industries Ltd",    gstNumber: "29AABCU9603R1ZM", bankAccount: "HDFC-1001-4532",  phone: "+91-9876543210", address: "12 MG Road, Bangalore",       riskScore: 15, riskLevel: "low",      flagCount: 0, status: "active",       registeredDate: "2023-01-15" },
    { id: "S002", companyName: "Nova Trading Co",        gstNumber: "27AADCN2583R1Z4", bankAccount: "ICICI-2003-7812", phone: "+91-9123456789", address: "45 Marine Drive, Mumbai",    riskScore: 82, riskLevel: "critical",  flagCount: 5, status: "under_review", registeredDate: "2024-03-22" },
    { id: "S003", companyName: "Phoenix Exports Pvt",   gstNumber: "33AABCP8765R1Z1", bankAccount: "ICICI-2003-7812", phone: "+91-8765432109", address: "45 Marine Drive, Mumbai",    riskScore: 91, riskLevel: "critical",  flagCount: 7, status: "suspended",    registeredDate: "2024-04-10" },
    { id: "S004", companyName: "Sterling Materials",    gstNumber: "06AADCS1234R1Z9", bankAccount: "SBI-3004-5566",   phone: "+91-7654321098", address: "78 Cyber City, Gurgaon",     riskScore: 42, riskLevel: "medium",    flagCount: 2, status: "active",       registeredDate: "2022-11-05" },
    { id: "S005", companyName: "Orion Supplies",        gstNumber: "09AABCO6543R1Z2", bankAccount: "AXIS-4005-8899",  phone: "+91-6543210987", address: "23 Hazratganj, Lucknow",     riskScore:  8, riskLevel: "low",       flagCount: 0, status: "active",       registeredDate: "2021-06-18" },
    { id: "S006", companyName: "Delta Fabricators",     gstNumber: "24AADCD9876R1Z5", bankAccount: "BOB-5006-2233",   phone: "+91-5432109876", address: "56 SG Highway, Ahmedabad",   riskScore: 67, riskLevel: "high",      flagCount: 3, status: "under_review", registeredDate: "2024-01-30" },
    { id: "S007", companyName: "Zenith Components",     gstNumber: "19AABCZ1122R1Z8", bankAccount: "PNB-6007-4455",   phone: "+91-4321098765", address: "89 Park Street, Kolkata",    riskScore: 22, riskLevel: "low",       flagCount: 1, status: "active",       registeredDate: "2023-08-12" },
    { id: "S008", companyName: "Ghost Enterprises LLC", gstNumber: "07AADCG3344R1Z3", bankAccount: "HDFC-1001-4532",  phone: "+91-3210987654", address: "12 MG Road, Bangalore",       riskScore: 95, riskLevel: "critical",  flagCount: 9, status: "suspended",    registeredDate: "2024-06-01" },
    { id: "S009", companyName: "Prism Logistics",       gstNumber: "32AABCP5566R1Z6", bankAccount: "KOTAK-7008-6677", phone: "+91-2109876543", address: "34 Anna Salai, Chennai",      riskScore: 35, riskLevel: "medium",    flagCount: 1, status: "active",       registeredDate: "2022-04-25" },
    { id: "S010", companyName: "Nebula Raw Materials",  gstNumber: "20AADCN7788R1Z0", bankAccount: "UNION-8009-8899", phone: "+91-1098765432", address: "67 Mall Road, Ranchi",        riskScore: 55, riskLevel: "high",      flagCount: 2, status: "under_review", registeredDate: "2023-12-14" },
    { id: "S011", companyName: "Echo Trading Intl",     gstNumber: "27AADCE9900R1Z7", bankAccount: "BOB-5006-2233",   phone: "+91-9988776655", address: "56 SG Highway, Ahmedabad",   riskScore: 78, riskLevel: "high",      flagCount: 4, status: "under_review", registeredDate: "2024-05-18" },
    { id: "S012", companyName: "Vertex Solutions",      gstNumber: "29AABCV2211R1Z4", bankAccount: "HDFC-9010-1122",  phone: "+91-8877665544", address: "90 Whitefield, Bangalore",    riskScore: 12, riskLevel: "low",       flagCount: 0, status: "active",       registeredDate: "2021-09-30" },
  ],
  invoices: [
    { id: "INV001", supplierId: "S001", supplierName: "Apex Industries Ltd",    amount:  245000, date: "2025-01-15", invoiceNumber: "APX-2025-001", flags: ["clean"],                                  riskScore:  5 },
    { id: "INV002", supplierId: "S002", supplierName: "Nova Trading Co",        amount: 1850000, date: "2025-01-18", invoiceNumber: "NVT-2025-042", flags: ["inflated", "circular_trade"],             riskScore: 85 },
    { id: "INV003", supplierId: "S003", supplierName: "Phoenix Exports Pvt",   amount: 1850000, date: "2025-01-18", invoiceNumber: "NVT-2025-042", flags: ["duplicate", "shell_company"],             riskScore: 95 },
    { id: "INV004", supplierId: "S004", supplierName: "Sterling Materials",    amount:  567000, date: "2025-01-20", invoiceNumber: "STR-2025-015", flags: ["clean"],                                  riskScore: 10 },
    { id: "INV005", supplierId: "S006", supplierName: "Delta Fabricators",     amount: 2340000, date: "2025-01-22", invoiceNumber: "DLT-2025-008", flags: ["inflated"],                              riskScore: 60 },
    { id: "INV006", supplierId: "S008", supplierName: "Ghost Enterprises LLC", amount: 4500000, date: "2025-01-25", invoiceNumber: "GHT-2025-001", flags: ["shell_company","inflated","circular_trade"], riskScore: 98 },
    { id: "INV007", supplierId: "S005", supplierName: "Orion Supplies",        amount:  123000, date: "2025-02-01", invoiceNumber: "ORS-2025-019", flags: ["clean"],                                  riskScore:  3 },
    { id: "INV008", supplierId: "S011", supplierName: "Echo Trading Intl",     amount:  890000, date: "2025-02-05", invoiceNumber: "ECH-2025-033", flags: ["circular_trade"],                        riskScore: 72 },
    { id: "INV009", supplierId: "S007", supplierName: "Zenith Components",     amount:  334000, date: "2025-02-08", invoiceNumber: "ZEN-2025-011", flags: ["clean"],                                  riskScore:  8 },
    { id: "INV010", supplierId: "S010", supplierName: "Nebula Raw Materials",  amount: 1120000, date: "2025-02-10", invoiceNumber: "NBL-2025-007", flags: ["inflated", "shell_company"],             riskScore: 68 },
  ],
  transactions: [
    { from: "S002", to: "S003", amount: 1850000, date: "2025-01-18" },
    { from: "S003", to: "S008", amount: 1700000, date: "2025-01-20" },
    { from: "S008", to: "S002", amount: 1650000, date: "2025-01-22" },
    { from: "S006", to: "S011", amount:  890000, date: "2025-01-25" },
    { from: "S011", to: "S006", amount:  850000, date: "2025-02-01" },
    { from: "S001", to: "S004", amount:  245000, date: "2025-01-15" },
    { from: "S005", to: "S007", amount:  123000, date: "2025-02-01" },
    { from: "S009", to: "S012", amount:  334000, date: "2025-02-05" },
    { from: "S010", to: "S003", amount:  560000, date: "2025-02-08" },
    { from: "S004", to: "S009", amount:  200000, date: "2025-02-10" },
  ],
  alerts: [
    { id: "ALT001", type: "circular_trade",    severity: "critical", message: "Circular trading detected: Nova → Phoenix → Ghost → Nova (Value: ₹1.65Cr)",              entityId: "S002", entityName: "Nova Trading Co",       timestamp: "2025-02-27T10:23:00Z", resolved: false },
    { id: "ALT002", type: "shell_company",     severity: "critical", message: "Potential Shell Company: Ghost Enterprises shares HDFC-1001-4532 with Apex Industries", entityId: "S008", entityName: "Ghost Enterprises LLC",  timestamp: "2025-02-27T09:45:00Z", resolved: false },
    { id: "ALT003", type: "duplicate_invoice", severity: "high",     message: "Duplicate Invoice Match: NVT-2025-042 submitted by Phoenix & Nova",                     entityId: "S003", entityName: "Phoenix Exports Pvt",   timestamp: "2025-02-27T08:12:00Z", resolved: false },
    { id: "ALT004", type: "inflated_amount",   severity: "high",     message: "Inflated Billing: Invoice GHT-2025-001 (₹45L) is 340% higher than average for S008",   entityId: "S008", entityName: "Ghost Enterprises LLC",  timestamp: "2025-02-26T16:30:00Z", resolved: false },
    { id: "ALT005", type: "shared_bank",       severity: "medium",   message: "Shared Infrastructure: Delta & Echo share bank account BOB-5006-2233",                  entityId: "S006", entityName: "Delta Fabricators",      timestamp: "2025-02-26T14:15:00Z", resolved: true  },
    { id: "ALT006", type: "circular_trade",    severity: "high",     message: "Bidirectional trading detected between Delta Fabricators and Echo Trading Intl",         entityId: "S011", entityName: "Echo Trading Intl",      timestamp: "2025-02-26T11:00:00Z", resolved: false },
    { id: "ALT007", type: "inflated_amount",   severity: "medium",   message: "Price Anomaly: Invoice DLT-2025-008 unit price 2.1x market standard",                   entityId: "S006", entityName: "Delta Fabricators",      timestamp: "2025-02-25T09:20:00Z", resolved: true  },
  ],
  network: {
    nodes: [
      { id: "S002", label: "Nova Trading",     riskLevel: "critical", x: 400, y: 120 },
      { id: "S003", label: "Phoenix Exports",  riskLevel: "critical", x: 600, y: 280 },
      { id: "S008", label: "Ghost Enterprises",riskLevel: "critical", x: 200, y: 280 },
      { id: "S006", label: "Delta Fabricators",riskLevel: "high",     x: 500, y: 450 },
      { id: "S011", label: "Echo Trading",     riskLevel: "high",     x: 300, y: 450 },
      { id: "S001", label: "Apex Industries",  riskLevel: "low",      x: 100, y: 120 },
      { id: "S004", label: "Sterling Materials",riskLevel: "medium",  x: 700, y: 120 },
      { id: "S005", label: "Orion Supplies",   riskLevel: "low",      x: 100, y: 450 },
      { id: "S007", label: "Zenith Components",riskLevel: "low",      x: 700, y: 450 },
      { id: "S010", label: "Nebula Raw",       riskLevel: "high",     x: 700, y: 350 },
    ],
    edges: [
      { from: "S002", to: "S003", amount: 1850000, suspicious: true  },
      { from: "S003", to: "S008", amount: 1700000, suspicious: true  },
      { from: "S008", to: "S002", amount: 1650000, suspicious: true  },
      { from: "S006", to: "S011", amount:  890000, suspicious: true  },
      { from: "S011", to: "S006", amount:  850000, suspicious: true  },
      { from: "S001", to: "S004", amount:  245000, suspicious: false },
      { from: "S005", to: "S007", amount:  123000, suspicious: false },
      { from: "S010", to: "S003", amount:  560000, suspicious: true  },
    ],
  },
};

// ── Read / write helpers ────────────────────────────────────────────────────
function load() {
  if (!fs.existsSync(DATA_FILE)) {
    console.log("🌱 First run — seeding intellitrace.json…");
    fs.writeFileSync(DATA_FILE, JSON.stringify(SEED, null, 2), "utf8");
    console.log("✅ Seeded successfully.");
    return JSON.parse(JSON.stringify(SEED)); // deep clone
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { load, save };
