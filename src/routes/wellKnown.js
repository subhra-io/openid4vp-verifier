import express from 'express';
import { publicKey } from '../config/key.js';
import { exportJWK } from 'jose';

const router = express.Router();

router.post('/openid-configuration', (req, res) => {
  res.json({
    issuer: "https://verifier.example.com",
    authorization_endpoint: "https://verifier.example.com/authorize",
    response_types_supported: ["vp_token"],
    vp_formats_supported: {
      jwt_vp: {
        alg_values_supported: ["RS256"]
      }
    },
    jwks_uri: "https://verifier.example.com/keys"
  });
});

router.post('/keys', async (req, res) => {
  const jwk = await exportJWK(publicKey);
  jwk.alg = 'RS256';
  jwk.use = 'sig';
  res.json({ keys: [jwk] });
});

export default router;
