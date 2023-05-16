import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'
import path from 'path'
import connection from './connection.mjs'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express()

const conn = mysql.createConnection(connection)

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home')
})

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


conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conexão feita com sucesso')
    }
})

app.listen(3000)