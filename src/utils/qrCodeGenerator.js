const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const PRIVATE_KEY_PATH = path.join(__dirname, '../config/private.key');

function generateJWT() {
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

  const payload = {
    client_id: "https://pehchaanstage.uidai.gov.in/",
    response_type: "vp_token",
    scope: "openid vp_token",
    redirect_uri: "https://pehchaanstage.uidai.gov.in/samvaad/openid/getrequest",
    request_uri: "https://pehchaanstage.uidai.gov.in/samvaad/openid/callback",
    nonce: uuidv4(),
    state: uuidv4()
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    header: { typ: 'JWT', alg: 'RS256' }
  });

  return token;
}

function jwtToBase10(jwtToken) {
  const jwtBuffer = Buffer.from(jwtToken, 'latin1');
  const delimiter = Buffer.from([0xFF]);
  const combinedBuffer = Buffer.concat([jwtBuffer, delimiter]);
  const compressedBuffer = zlib.gzipSync(combinedBuffer);
  const bigIntValue = BigInt('0x' + compressedBuffer.toString('hex'));
  return bigIntValue.toString(10);
}

function getQRCodePayload() {
  const jwt = generateJWT();
  const base10Value = jwtToBase10(jwt);
  const payloadUrl = `https://maadhaar.com/openid?value=${base10Value}`;

  const now = new Date();
  const response = {
    Payload: payloadUrl,
    TransactionID: uuidv4(),
    GeneratedTimestamp: now.toISOString(),
    ExpiryTimestamp: new Date(now.getTime() + 60 * 60 * 1000).toISOString()
  };

  return response;
}

module.exports = { getQRCodePayload };
