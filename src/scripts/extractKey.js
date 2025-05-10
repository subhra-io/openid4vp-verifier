// extractKey.js
import forge from 'node-forge';
import { privateKey, publicJwk } from "../config/key.js";

// Load private key from PEM
const privateKeyPem = privateKey;
const privateKeyForge = forge.pki.privateKeyFromPem(privateKeyPem);

// Extract public key
const publicKeyForge = privateKeyForge.public;

// Extract modulus (n) and exponent (e)
const n = publicKeyForge.n.toString(16);  // Modulus (n) in hexadecimal
const e = publicKeyForge.e.toString(16);  // Exponent (e) in hexadecimal

console.log('Modulus (n):', n);
console.log('Exponent (e):', e);
