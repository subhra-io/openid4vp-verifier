// src/routes/callback.js
import express from 'express';

const router = express.Router();

// Temporary in-memory storage (not for production)
let lastVpToken = null;
let lastState = null;

// POST route to receive VP token
router.post('/', (req, res) => {
  const { vp_token, state } = req.body;

  if (!vp_token || !state) {
    return res.status(400).json({ error: 'vp_token and state are required' });
  }

  lastVpToken = vp_token;
  lastState = state;

  console.log("Received VP Token:", vp_token);
  console.log("State:", state);

  res.json({
    message: "VP token received and logged.",
    vp_token,
    state
  });
});

// GET route to fetch the last received VP token and state
router.get('/', (req, res) => {
  if (!lastVpToken || !lastState) {
    return res.status(404).json({ error: "No VP token found yet." });
  }

  res.json({
    message: "Last received VP token.",
    vp_token: lastVpToken,
    state: lastState
  });
});

export default router;
