import express from 'express'
import exphbs from 'express-handlebars'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res)=>{
    const items = ['item 1', 'item 2', 'item 3',]
    res.render('dashboard', {items})
})

app.get('/', (req, res)=>{
    
    const user = {
        name: 'Luidson',
        surname: 'Lima',
        age: 23
    }
    const texto = 'Luidson está aprendendo Node.js e é mais fácil que o phpta'

    const auth = true

    const approved = true
    
    //user : user *apelido o parâmetro
    res.render('home', {user : user, texto, auth, approved})
})

app.listen(3000,()=>{
    console.log('App rodando')
})