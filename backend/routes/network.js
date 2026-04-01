const express = require("express");
const router  = express.Router();
const { load } = require("../db");

// GET /api/network — nodes + edges
router.get("/", (_req, res) => {
  const { network } = load();
  res.json(network);
});

module.exports = router;
