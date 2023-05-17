import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'
import path from 'path'
import connection from './connection.mjs'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

//O objeto app criado é usado para configurar o servidor web e definir rotas, tratadores de requisições e outras funcionalidades relacionadas ao servidor.
const app = express()
//cria uma nova conexão com o banco de dados MySQL usando as informações de conexão fornecidas como parâmetro. 
const conn = mysql.createConnection(connection)

//Executa conexão com o banco de dados
conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conexão feita com sucesso')
    }
})

app.use(
    express.urlencoded({
        extended: true
        //É um objeto de opções que está sendo passado para o middleware express.urlencoded(). A opção extended determina se o middleware usará a biblioteca qs ou a biblioteca nativa do Node.js (querystring) para fazer a análise dos dados. Quando definido como true, a biblioteca qs será usada para analisar objetos complexos dentro dos dados enviados.
    })
)

//Este é um middleware embutido no Express.js que é usado para analisar o corpo das requisições com o tipo de conteúdo application/json. Esse tipo de conteúdo é comumente usado quando você envia dados em formato JSON no corpo da requisição, por exemplo, ao fazer uma solicitação POST ou PUT.
app.use(express.json())

//configurando o mecanismo de template Handlebars no aplicativo Express usando o pacote express-handlebars
app.engine('handlebars', exphbs.engine())
//está configurando a engine de visualização (view engine) do Express para usar o mecanismo de template Handlebars. 
app.set('view engine', 'handlebars')

//express.static() é um middleware embutido no Express.js que é usado para servir arquivos estáticos, como HTML, CSS, imagens, arquivos JavaScript, etc.
//dirname é uma variável global do Node.js que representa o diretório do arquivo atual. Ela fornece o caminho absoluto para o diretório atual onde o script está sendo executado.
app.use(express.static(__dirname + '/public'));


// rotas get-------------------------------------------------------------------------------------
app.get('/books', (req, res)=>{
    const sql = 'SELECT * FROM books'
    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }

        const books = data
        res.render('books', {books})
    })
})

app.get('/books/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id =${id}`

    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        
        const book = data[0]

        res.render('book', {book})
    })
})

app.get('/', (req, res)=>{
    res.render('home')
})

//rotas post ------------------------------------------------------------------------------
app.post('/books/insertbook', (req, res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books(title, pageqty) VALUES('${title}', '${pageqty}')`

    conn.query(sql,(err)=>{
        if(err){
            console.log(err)
        }
    })
    res.redirect('/')
})


app.listen(3000)