const express = require("express");
const router  = express.Router();
const { load } = require("../db");

// GET /api/transactions — all, sorted by date descending
router.get("/", (_req, res) => {
  const { transactions } = load();
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  res.json(sorted);
});

module.exports = router;
