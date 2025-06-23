const express = require("express");
const router = express.Router();
const { runSetup } = require("../db/setup");

router.post("/", async (req, res) => {
  try {
    const result = await runSetup(req.body);
    res.json({
      success: true,
      message: "Installation terminée",
      details: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
