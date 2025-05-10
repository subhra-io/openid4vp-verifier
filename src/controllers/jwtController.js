// src/controllers/jwtController.js
import jwt from "jsonwebtoken";
import { privateKey, publicJwk } from "/Users/nikhil/Desktop/openid4vp-verifier/src/config/key.js";
import { v4 as uuidv4 } from "uuid";

// Handle Authorization Request
export const handleAuthorizationRequest = (req, res) => {
  const { client_id, redirect_uri, nonce, state, presentation_definition } = req.body;

  // Validate and check the required fields
  if (!client_id || !redirect_uri || !nonce || !state || !presentation_definition) {
    return res.status(400).json({ error: "Missing required fields in request" });
  }

  // Construct the JWT authorization request
  const payload = {
    client_id,
    redirect_uri,
    nonce,
    state,
    presentation_definition,
  };

  // Sign the JWT using private key
  const token = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: process.env.JWT_EXPIRATION });

  res.json({ authorization_request: token });
};

// Handle Callback - Validate JWT and return Verifiable Presentation
export const handleJwtCallback = (req, res) => {
  const { vp_token, state } = req.body;

  if (!vp_token || !state) {
    return res.status(400).json({ error: "Missing vp_token or state" });
  }

  try {
    // Verify the JWT received in the callback
    const decoded = jwt.verify(vp_token, publicJwk, { algorithms: ["RS256"] });

    // Add more validation logic here as required
    console.log("Decoded JWT: ", decoded);

    // Simulate processing of credentials and responding to the verifier
    const vpResponse = {
      vp_token: vp_token,
      state: state,
    };

    res.json(vpResponse);
  } catch (error) {
    console.error("JWT verification failed", error);
    res.status(401).json({ error: "Invalid vp_token" });
  }
};
