// src/routes/callback.js
import express from 'express';

const router = express.Router();

// In-memory store for VP tokens by state
const vpStore = new Map();

// POST /callback - called by mobile app
router.post('/', (req, res) => {
  const { vp_token, state } = req.body;

  if (!vp_token || !state) {
    return res.status(400).json({ error: "Missing vp_token or state" });
  }

  // Store VP token
  vpStore.set(state, vp_token);
  console.log("Stored VP for state:", state);

  res.json({ message: "VP token received and stored." });
});

// GET /vp/:state - called by verifier frontend to retrieve the VP
router.get('/vp/:state', (req, res) => {
  const { state } = req.params;

  const vp = vpStore.get(state);
  if (!vp) {
    return res.status(404).json({ error: "VP not found for this state yet." });
  }

  res.json({ vp_token: vp });
});

export default router;
