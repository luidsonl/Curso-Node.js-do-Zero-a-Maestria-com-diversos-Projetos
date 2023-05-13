import express from 'express'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const basePath = path.join(__dirname, '../templates')

const router = express.Router()

router.get('/contact', (req, res)=>{
    res.sendFile(`${basePath}/contact.html`)
})

router.get('/project/:id', (req, res)=>{
    res.sendFile(`${basePath}/project.html`)
})

router.get('/', (req, res)=>{
    res.sendFile(`${basePath}/home.html`)
})

router.use((req,res,next)=>{
    res.status(404).sendFile(`${basePath}/404.html`)
  })


export default router