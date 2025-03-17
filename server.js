// API - Aplication Progamming Interface
// REST - Representational State Transfer

// GET ; POST ; PATCH, PUT ; DELETE

// JSON - JavaScript Object Notation

// node --watch ./api.js (Reinicia a api, a cada alteração no código)

import express from 'express';
import publicRoutes from "./routes/public.js";
import privateRoutes from './routes/private.js';

import auth from './middlewares/auth.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(PORT, () => console.log(`O servidor está rodando 🚀`));
