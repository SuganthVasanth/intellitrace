const express = require("express");
const router  = express.Router();
const { load, save } = require("../db");

// GET /api/alerts — unresolved first, then resolved, sorted by timestamp desc
router.get("/", (_req, res) => {
  const { alerts } = load();
  const sorted = [...alerts].sort((a, b) => {
    if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  res.json(sorted);
});

// GET /api/alerts/:id — single alert
router.get("/:id", (req, res) => {
  const { alerts } = load();
  const alert = alerts.find((a) => a.id === req.params.id);
  if (!alert) return res.status(404).json({ error: "Alert not found" });
  res.json(alert);
});

// PATCH /api/alerts/:id/resolve — toggle resolved state
router.patch("/:id/resolve", (req, res) => {
  const data = load();
  const idx  = data.alerts.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Alert not found" });
  data.alerts[idx].resolved = !data.alerts[idx].resolved;
  save(data);
  res.json({ success: true, id: req.params.id, resolved: data.alerts[idx].resolved });
});

module.exports = router;
