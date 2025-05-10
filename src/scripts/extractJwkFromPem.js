import fs from 'fs';
import forge from 'node-forge';

const runPrivateKey = async () => {
  const pem = fs.readFileSync(new URL('../config/private.key', import.meta.url), 'utf8');
  const privateKey = forge.pki.privateKeyFromPem(pem);
  const publicKey = privateKey.publicKey;

  const jwk = {
    kty: 'RSA',
    n: forge.util.bytesToHex(publicKey.n.toByteArray()),
    e: forge.util.bytesToHex(publicKey.e.toByteArray()),
    alg: 'RS256',
    use: 'sig',
    kid: 'verifier-key-1'
  };

  console.log(JSON.stringify(jwk, null, 2));
};

runPrivateKey();
