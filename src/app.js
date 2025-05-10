// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import authorizeRouter from './routes/authorize.js';
import callbackRouter from './routes/callback.js';
import wellKnownRouter from './routes/wellKnown.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/authorize', authorizeRouter);
app.use('/callback', callbackRouter);
app.use('/.well-known', wellKnownRouter);

export default app;
