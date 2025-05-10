// src/utils/generateAuthRequest.js
import jwt from 'jsonwebtoken';
import { privateKey } from '../config/key.js';
import { v4 as uuidv4 } from 'uuid';

export function generateAuthRequest() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: "https://verifier.example.com",
    aud: "https://wallet.example.com",
    iat: now,
    exp: now + 600,
    nonce: uuidv4(),
    state: uuidv4(),
    response_type: "vp_token",
    client_id: "https://verifier.example.com/callback",
    redirect_uri: "https://verifier.example.com/callback",
    scope: "openid",
    presentation_definition: {
      id: "vp-request",
      input_descriptors: [{
        id: "name-cred",
        schema: [{ uri: "https://schema.org/Person" }]
      }]
    }
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    header: { typ: 'JWT', alg: 'RS256', kid: "verifier-key-1" }
  });
}
