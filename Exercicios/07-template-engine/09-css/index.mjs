import express from 'express'
import exphbs from 'express-handlebars'

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboard', (req, res)=>{
    const items = ['item 1', 'item 2', 'item 3',]
    res.render('dashboard', {items})
})

app.get('/post', (req, res)=>{
    const post = {
        title: 'Aprender node',
        category: 'JavaScript',
        body: 'Aprenda node com este post',
        coments: 20,
    }

    res.render('blogpost', { post })
})

app.get('/blog', (req, res)=>{
    const posts = [
        {
            title: 'Aprender node',
            category: 'JavaScript',
            body: 'Aprenda node com este post',
            coments: 20,
        },
        {
            title: 'Aprender python',
            category: 'Python',
            body: 'Aprenda python com este post',
            coments: 15,
        },
        {
            title: 'Aprender php',
            category: 'PHP',
            body: 'Aprenda php com este post',
            coments: 3,
        },
    ]
    res.render('blog', {posts})

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