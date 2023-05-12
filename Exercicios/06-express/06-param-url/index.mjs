import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const basePath = path.join(__dirname, 'templates');

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  //TODO leitura da tabela users e resgate do usuário
  console.log(`Buscando pelo usuário: ${id}`)

  res.sendFile(path.join(`${basePath}/users.html`));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(`${basePath}/index.html`));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
