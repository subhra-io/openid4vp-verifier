import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicKey = fs.readFileSync(path.join(__dirname, 'public.pem'), 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

export { publicKey, privateKey };
