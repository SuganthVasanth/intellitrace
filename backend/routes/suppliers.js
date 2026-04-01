const express = require("express");
const router  = express.Router();
const { load, save } = require("../db");

// GET /api/suppliers — all, sorted by riskScore descending
router.get("/", (_req, res) => {
  const { suppliers } = load();
  res.json([...suppliers].sort((a, b) => b.riskScore - a.riskScore));
});

// GET /api/suppliers/:id — single supplier
router.get("/:id", (req, res) => {
  const { suppliers } = load();
  const supplier = suppliers.find((s) => s.id === req.params.id);
  if (!supplier) return res.status(404).json({ error: "Supplier not found" });
  res.json(supplier);
});

// PATCH /api/suppliers/:id/status — update status
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  const valid = ["active", "suspended", "under_review"];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${valid.join(", ")}` });
  }
  const data = load();
  const idx  = data.suppliers.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Supplier not found" });
  data.suppliers[idx].status = status;
  save(data);
  res.json({ success: true, id: req.params.id, status });
});

module.exports = router;
