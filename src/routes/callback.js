// src/routes/callback.js
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { vp_token, state } = req.body;

  // Log the response (simulate validation)
  console.log("Received VP Token:", vp_token);
  console.log("State:", state);

  res.json({ message: "VP token received and logged." });
});

export default router;
