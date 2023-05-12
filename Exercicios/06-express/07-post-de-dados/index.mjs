import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.join(__dirname, 'templates');

const app = express();
const port = 3000;

// Ler body
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.get('/users/add',(req,res)=>{
  res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req,res)=>{

  const name = req.body.name
  const age = req.body.age

  console.log(`Seu nome é ${name} e você tem ${age} anos`)

  res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  //TODO leitura da tabela users e resgate do usuário
  console.log(`Buscando pelo usuário: ${id}`)

  res.sendFile(`${basePath}/users.html`);
});

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


