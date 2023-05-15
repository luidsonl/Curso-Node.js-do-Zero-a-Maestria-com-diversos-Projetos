import express from 'express'
import exphbs from 'express-handlebars'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const products = [
    {
        id: 1,
        title: 'TV',
        price: 3499.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ligula nec massa finibus feugiat. Sed viverra tincidunt urna eget cursus. Integer aliquet condimentum urna, a laoreet nulla vestibulum ac',
    },
    {
        id: 2,
        title: 'Iphone',
        price: 12499.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ligula nec massa finibus feugiat. Sed viverra tincidunt urna eget cursus. Integer aliquet condimentum urna, a laoreet nulla vestibulum ac',
    },
    {
        id: 3,
        title :'Livro',
        price: 59.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ligula nec massa finibus feugiat. Sed viverra tincidunt urna eget cursus. Integer aliquet condimentum urna, a laoreet nulla vestibulum ac',
    }
]


app.get('/product:id', (req,res)=>{
    const product = products[parseInt(req.params.id) - 1]
    res.render('product', {product})
})

app.get('/', (req,res)=>{
    res.render('home', {products})
})

app.listen(3000)