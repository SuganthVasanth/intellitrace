const express = require("express");
const router  = express.Router();
const { load } = require("../db");

// GET /api/invoices — all, sorted by riskScore descending
router.get("/", (_req, res) => {
  const { invoices } = load();
  res.json([...invoices].sort((a, b) => b.riskScore - a.riskScore));
});

// GET /api/invoices/:id — single invoice
router.get("/:id", (req, res) => {
  const { invoices } = load();
  const invoice = invoices.find((inv) => inv.id === req.params.id);
  if (!invoice) return res.status(404).json({ error: "Invoice not found" });
  res.json(invoice);
});

module.exports = router;
