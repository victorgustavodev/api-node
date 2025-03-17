import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import privateRoutes from './private.js';


const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/cadastro', async (req,res)=> {
    try {
    const user = req.body;

    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
    });

    if (existingUser) {
        return res.status(400).json({ message: "E-mail já cadastrado!" });
    }
    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    
    const userDB = await prisma.user.create({
        data: {
            name: user.name,
            email:user.email,
            password: hashPassword,
        },
    })
    res.status(201).json(userDB);
} catch(err) {
    res.status(500).json({message:`Erro no servidor ${err}`});
}
})

// Login

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    // Procura o usuario no banco de dados
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    // Verifica se o usuario existe, caso não retorna um erro.
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Verifica se a senha corresponde a senha do banco de dados.
    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
        return res.status(400).json({message: 'Senha inválida!'});
    }

    // Gerar o token JWT

    const token = jwt.sign({ id: user.id}, JWT_SECRET, {expiresIn: '7d'});    

    res.status(200).json(token);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Erro no servidor ${err}` });
  }
});

export default router;