import express from 'express'
import exphbs from 'express-handlebars'
import pool from './db/conn.mjs'
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

//O objeto app criado é usado para configurar o servidor web e definir rotas, tratadores de requisições e outras funcionalidades relacionadas ao servidor.
const app = express()


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
    pool.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }

        const books = data
        res.render('books', {books})
    })
})

app.get('/books/edit/:id', (req, res)=>{
    const id = req.params.id
    
    const sql = 'SELECT * FROM books WHERE ?? = ?'
    const sanitize = ['id', id]

    pool.query(sql, sanitize, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data[0]

        res.render('editbook', {book})
    })
})

app.get('/books/:id', (req, res)=>{
    const id = req.params.id

    const sql = 'SELECT * FROM books WHERE ?? = ?'
    const sanitize = ['id', id]

    pool.query(sql, sanitize,(err, data)=>{
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

    const sql = 'INSERT INTO books(??, ??) VALUES(?, ?)'
    const sanitize = ['title', 'pageqty', title, pageqty]

    pool.query(sql, sanitize , (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.post('/books/updatebook', (req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = 'UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?'

    const sanitize = ['title', title, 'pageqty', pageqty, 'id', id]

    pool.query(sql, sanitize,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.post('/books/remove/:id', (req, res)=>{
    const id = req.params.id
    const sql = 'DELETE FROM books WHERE ?? = ?'
    const sanitize = ['id', id]

    pool.query(sql, sanitize, (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})


app.listen(3000)