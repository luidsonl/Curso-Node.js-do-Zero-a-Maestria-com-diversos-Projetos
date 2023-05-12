import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import users from './users/index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const basePath = path.join(__dirname, 'templates')

const app = express()
const port = 3000


// Ler body
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use('/users', users)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


