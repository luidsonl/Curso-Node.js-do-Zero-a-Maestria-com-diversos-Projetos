import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'
import path from 'path'
import connection from './connection.mjs'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home')
})

const conn = mysql.createConnection(connection)

conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conexão feita com sucesso')
    }
})
app.listen(3000)