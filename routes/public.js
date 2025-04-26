import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const router = express.Router()
const prisma = new PrismaClient()

// Cadastro
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body

        const saltRounds = await bcrypt.genSalt(10)
        const hashPassoword = await bcrypt.hash(user.password, saltRounds)

    const userDB = await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            password: hashPassoword
        }
    })

    res.status(201).json(userDB)
    } catch (error) {
        res.status(404).json({mensagem: `Erro no cadastro: ${error.message}`})
        return undefined
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body

        const user = await prisma.user.findUnique({
             where: { email: userInfo.email },
            })

            if (!user) {
                res.status(404).json({mensagem: 'Usuário não encontrado!'})
            }

            res.status(200).json(user)
    } catch (error) {
        res.status(404).json({messagem: `Erro login: ${error.message}`})
    }
})



export default router

// amaral
// nzLOYD8sr8DYzKh4