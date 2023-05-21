import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.mjs'
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express()


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'));


// rotas get-------------------------------------------------------------------------------------

app.get('/', (req, res)=>{
    res.render('home')
})

//rotas post ------------------------------------------------------------------------------


app.listen(3000)