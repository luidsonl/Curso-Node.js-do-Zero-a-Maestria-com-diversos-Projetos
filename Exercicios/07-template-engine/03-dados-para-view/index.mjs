import express from 'express'
import exphbs from 'express-handlebars'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    
    const user = {
        name: 'Luidson',
        surname: 'Lima',
        age: 23
    }
    const texto = 'Luidson está aprendendo Node.js e é mais fácil que o phpta'
    
    //user : user *apelido o parâmetro
    res.render('home', {user : user, texto})
})

app.listen(3000,()=>{
    console.log('App rodando')
})