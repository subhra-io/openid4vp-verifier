// server.js
import express from 'express';
import wellKnownRoutes from './src/routes/wellKnown.js';

const app = express();
const PORT = 3000;

// Middleware and other route handlers
app.use('/.well-known', wellKnownRoutes);

// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the OpenID4VP Verifier!');
});

app.listen(PORT, () => {
  console.log(`OpenID4VP Verifier running on http://localhost:${PORT}`);
});
