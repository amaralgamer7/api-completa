import express from 'express'
import publicRoutes from './routes/public.js'

const app = express()
const PORT = 3000
app.use(express.json())

app.use('/usuarios', publicRoutes)




app.listen(PORT, () => {
    console.log(`O servidor está sendo executado na porta ${PORT} `)
})