// API - Aplication Progamming Interface
// REST - Representational State Transfer

// GET ; POST ; PATCH, PUT ; DELETE

// JSON - JavaScript Object Notation

// node --watch ./api.js (Reinicia a api, a cada alteração no código)

import express from 'express';
import publicRoutes from "./routes/public.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/', publicRoutes)

app.listen(PORT, () => console.log(`O servidor está rodando 🚀`));


// user: yvictory01
// pass: root

// mongodb+srv://yvictory01:<db_password>@test.vvb2n.mongodb.net/?retryWrites=true&w=majority&appName=Test
