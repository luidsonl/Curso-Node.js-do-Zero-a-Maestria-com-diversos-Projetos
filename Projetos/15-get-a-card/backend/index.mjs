import express, { json } from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.mjs'
import PotRoutes from './routes/PotRoutes.mjs'


const app = express()
app.use(express.json())

app.use(cors({credentials: true, origin: 'https://localhost:3000'}))

app.use(express.static('public'))


//routes
app.use('/users', UserRoutes)
app.use('/pots', PotRoutes)

app.listen(5000)
