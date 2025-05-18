import express, { json } from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.mjs'


const app = express()
app.use(express.json())

app.use(cors({credentials: true, origin: 'https://localhost:3000'}))

app.use(express.static('public'))


//routes
app.use('/users', UserRoutes)

app.listen(5000)
