require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import DB first — this creates and seeds the database on first run
require("./db");

const suppliersRouter    = require("./routes/suppliers");
const invoicesRouter     = require("./routes/invoices");
const alertsRouter       = require("./routes/alerts");
const networkRouter      = require("./routes/network");
const dashboardRouter    = require("./routes/dashboard");
const transactionsRouter = require("./routes/transactions");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// ── Request logger ────────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/suppliers",    suppliersRouter);
app.use("/api/invoices",     invoicesRouter);
app.use("/api/alerts",       alertsRouter);
app.use("/api/network",      networkRouter);
app.use("/api/dashboard",    dashboardRouter);
app.use("/api/transactions", transactionsRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 IntelliTrace API running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
