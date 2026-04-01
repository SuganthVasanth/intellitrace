# FraudShield 360°

> Real-time supply chain fraud detection and risk intelligence platform.

FraudShield 360° is an enterprise-grade dashboard designed to help organizations detect, monitor, and respond to fraudulent activity within their supply chain. It provides a centralized view of supplier risks, suspicious invoice patterns, and entity relationships — enabling proactive fraud prevention rather than reactive damage control.

---

## Core Features

### 🔐 Secure Authentication
- Google OAuth login for enterprise access
- Protected routes ensuring only authenticated users can access the dashboard
- Demo user mode for development and evaluation purposes

### 📊 FraudShield 360° Dashboard
- Real-time KPI cards displaying key metrics at a glance:
  - Total Suppliers monitored
  - High-Risk entities count with weekly trend
  - Fraud Cases detected with monthly trend
  - Total Money at Risk (in ₹)
  - Invoices processed
  - Pending Alerts count

### 🌐 Supplier Network Analysis
- Interactive canvas-based network graph visualizing relationships between suppliers and companies
- Color-coded nodes by risk level: **Critical**, **High**, **Medium**, **Low**
- Suspicious transaction links highlighted with dashed red lines and directional arrows
- Glow effect on critical-risk nodes for immediate visual identification

### 🏢 Supplier Risk Registry
- Comprehensive table of all monitored suppliers sorted by risk score
- Displays GST number, bank account, flag count, and operational status per supplier
- Color-coded risk scores (Critical / High / Medium / Low)
- Status indicators: Active, Under Review, Suspended

### 🧾 Invoice Verification
- Detailed invoice ledger sorted by risk score
- Fraud type flags per invoice:
  - **DUPLICATE** — duplicate invoice submissions
  - **INFLATED** — amounts artificially inflated
  - **SHELL CO** — linked to shell companies
  - **CIRCULAR** — part of circular trading schemes
  - **CLEAN** — verified and cleared
- Indian currency formatting (₹, Lakhs, Millions)

### 🚨 Active Alerts Panel
- Live feed of unresolved fraud alerts with severity badges
- Alert types include: Circular Trade, Shell Company, Duplicate Invoice, Inflated Amount, Shared Bank Account
- Timestamped entries with entity ID and name for quick investigation
- Resolved alerts remain visible but visually de-emphasized

### 🧠 FraudShield 360° Methodology
- Visual 8-step AI-powered detection pipeline overview:
  1. Data Integration
  2. Entity Verification
  3. Network Mapping
  4. AI Pattern Detection
  5. Circular Trading Detection
  6. Risk Scoring
  7. Alert Generation
  8. 24/7 Continuous Monitoring

### 🔍 Dedicated Module Pages
- **Suppliers** — Full supplier directory with risk intelligence
- **Invoices** — Complete invoice verification and fraud flag analysis
- **Network** — Standalone network graph for in-depth relationship analysis
- **Alerts** — Dedicated alert management and investigation view

---

## Fraud Detection Capabilities

| Fraud Type | Detection Method |
|---|---|
| Circular Trading | Network loop analysis between related entities |
| Shell Companies | Entity verification against known patterns |
| Duplicate Invoices | Invoice fingerprinting and comparison |
| Inflated Amounts | Statistical anomaly detection on transaction values |
| Shared Bank Accounts | Cross-supplier bank account matching |
