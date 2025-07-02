import express, { json } from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.mjs'
import CardRoutes from './routes/CardRoutes.mjs'


const app = express()
app.use(express.json())

app.use(cors({credentials: true, origin: 'https://localhost:3000'}))

app.use(express.static('public'))


//routes
app.use('/users', UserRoutes)
app.use('/cards', CardRoutes)

app.listen(5000)
