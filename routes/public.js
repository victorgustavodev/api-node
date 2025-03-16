import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient()

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

export default router;