import jwt from 'jsonwebtoken';
import { privateKey } from '../config/key.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Build and sign JWT for OpenID4VP presentation request.
 * @param {string[]} selectedFields - fields like ['ResidentName', 'Dob', 'Mobile']
 * @returns {string} - Signed JWT
 */
export function generateAuthRequest(selectedFields = []) {
  // Define valid field names to filter the input fields
  const validFieldMappings = new Set([
    "CredentialIssuingDate", "EnrolmentDate", "EnrolmentNumber", "IsNRI", "ResidentImage",
    "ResidentName", "LocalResidentName", "AgeAbove18", "AgeAbove50", "AgeAbove60",
    "AgeAbove75", "Dob", "Gender", "CareOf", "LocalCareOf", "Building", "LocalBuilding",
    "Locality", "LocalLocality", "Street", "LocalStreet", "Landmark", "LocalLandmark",
    "Vtc", "LocalVtc", "SubDistrict", "LocalSubDistrict", "District", "LocalDistrict",
    "State", "LocalState", "PoName", "LocalPoName", "Pincode", "Address",
    "RegionalAddress", "Mobile", "MaskedMobile", "Email", "MaskedEmail", "Uid",
    "MaskedUID", "Vid"
  ]);

  // Filter and map selectedFields to the constraints fields format
  const fields = selectedFields
    .filter(field => validFieldMappings.has(field))
    .map(field => ({
      path: [`$.credentialSubject.${field}`],
      filter: {
        type: "string"
      }
    }));

  // Always include Aadhaar ID as a required field with pattern validation
  fields.unshift({
    path: ["$.credentialSubject.id"],
    filter: {
      type: "string",
      pattern: "^[0-9]{12}$"
    }
  });

  const payload = {
    // Optional standard claims — add if needed
    iss: "https://verifier.example.com",       // issuer
    aud: "wallet.example",                      // audience

    client_id: "https://verifier.example.com",
    response_type: "vp_token",
    scope: "openid vp_token",
    redirect_uri: "walletapp://callback",
    nonce: uuidv4(),
    state: uuidv4(),
    presentation_definition: {
      id: "cred-req-1",
      input_descriptors: [{
        id: "aadhaar_credential",
        name: "Aadhaar Credential",
        purpose: "To verify your identity using Aadhaar",
        constraints: {
          fields
        }
      }]
    }
  };

  // Sign and return JWT using RS256 algorithm and including header with key id
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    header: {
      typ: 'JWT',
      alg: 'RS256',
      kid: "verifier-key-1"
    }
  });
}
