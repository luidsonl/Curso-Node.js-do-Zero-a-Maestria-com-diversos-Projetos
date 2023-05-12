import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const basePath = path.join(__dirname, 'templates');

const checkAuth = function(req, res, next){
  req.authStatus = true

  if(req.authStatus){
    console.log('Usuário logado! Pode continuar.')
    next()
  }else{
    console.log('Usuário não está logado. Faça login para continuar')
    next()
  }
}

app.use(checkAuth)

app.get('/', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
