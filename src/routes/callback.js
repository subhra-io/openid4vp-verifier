// src/routes/callback.js
import express from 'express';

const router = express.Router();

// POST route to receive the VP Token and State
router.post('/', (req, res) => {
  const { vp_token, state } = req.body;

  // Log the response (simulate validation)
  console.log("Received VP Token:", vp_token);
  console.log("State:", state);

  res.json({ message: "VP token received and logged.", vp_token, state });
});

// GET route to retrieve the VP Token and State (simulating the response)
let storedVPToken = '';
let storedState = '';

// This is just for the simulation. In a real-world scenario, you might save this in a database.
router.get('/', (req, res) => {
  if (storedVPToken && storedState) {
    return res.json({ vp_token: storedVPToken, state: storedState });
  } else {
    return res.status(404).json({ message: 'VP token or state not found.' });
  }
});

// Store the VP token and state when received
router.post('/store', (req, res) => {
  const { vp_token, state } = req.body;
  storedVPToken = vp_token;
  storedState = state;
  
  res.json({ message: 'VP Token and State stored successfully.' });
});

export default router;
