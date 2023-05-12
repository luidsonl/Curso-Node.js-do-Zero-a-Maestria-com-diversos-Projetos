import express from 'express';
import { Router } from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.join(__dirname, '../templates');
const router = Router();

router.get('/add',(req,res)=>{
    res.sendFile(`${basePath}/userform.html`);
});

router.post('/save', (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;

    console.log(`Seu nome é ${name} e você tem ${age} anos`);
    res.sendFile(`${basePath}/userform.html`);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    //TODO leitura da tabela e resgate do usuário
    console.log(`Buscando pelo usuário: ${id}`);
    res.sendFile(`${basePath}.html`);
});

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

export default router;
