import express, { json } from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.mjs'
import CardRoutes from './routes/CardRoutes.mjs'
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import MediaRoutes from './routes/MediaRountes.mjs';
import OfferRoutes from './routes/OfferRoutes.mjs';

dotenv.config();

const FRONTEND = process.env.FRONTEND;
const PORT = process.env.PORT;

const app = express()
app.use(express.json())

app.use(cors({credentials: true, origin: FRONTEND}))

app.use(fileUpload())

app.use(express.static('public'))


//routes
app.use('/users', UserRoutes)
app.use('/cards', CardRoutes)
app.use('/offers', OfferRoutes)
//app.use('/files', MediaRoutes)

app.listen(PORT)
