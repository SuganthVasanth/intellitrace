const express = require("express");
const router  = express.Router();
const { load } = require("../db");

// GET /api/dashboard/stats — computed KPI stats from live data
router.get("/stats", (_req, res) => {
  const { suppliers, invoices, alerts } = load();

  const totalSuppliers   = suppliers.length;
  const highRiskEntities = suppliers.filter((s) =>
    s.riskLevel === "critical" || s.riskLevel === "high"
  ).length;
  const fraudCasesDetected = alerts.filter((a) => !a.resolved).length;
  const totalMoneyAtRisk   = invoices
    .filter((inv) => inv.riskScore >= 60)
    .reduce((sum, inv) => sum + inv.amount, 0);
  const invoicesProcessed = invoices.length;
  const alertsPending     = alerts.filter((a) => !a.resolved).length;

  res.json({
    totalSuppliers,
    highRiskEntities,
    fraudCasesDetected,
    totalMoneyAtRisk,
    invoicesProcessed,
    alertsPending,
  });
});

module.exports = router;
