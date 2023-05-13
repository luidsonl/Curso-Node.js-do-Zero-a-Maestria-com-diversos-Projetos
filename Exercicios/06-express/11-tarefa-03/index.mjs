import express from "express";
import routes from './routes/index.mjs'


const app = express()
const port = 5000

app.use(express.static('public'))

app.use('/',routes)

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})