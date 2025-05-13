// server.js
import express from 'express';
import dotenv from 'dotenv';
import authorizeRouter from './src/routes/authorize.js';
import callbackRouter from './src/routes/callback.js';
import wellKnownRoutes from './src/routes/wellKnown.js';
import tokenRouter from './src/routes/token.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Define your routes
app.use('/authorize', authorizeRouter); // Authorization route
app.use('/callback', callbackRouter);   // Callback route
app.use('/.well-known', wellKnownRoutes); // Well-known route
app.use('/token', tokenRouter); // Add /token route

// Define the root route (for testing purposes)
app.get('/', (req, res) => {
res.send('Welcome to the OpenID4VP Verifier!');
});

app.listen(PORT, () => {
console.log(`OpenID4VP Verifier running on http://localhost:${PORT}`);
});

export default app;