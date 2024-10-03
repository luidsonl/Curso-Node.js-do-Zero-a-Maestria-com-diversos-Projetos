import express from 'express'

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// endpoints
app.get('/', (req, res)=>{
    res.json({
        message: 'olá mundo'
    })
})

app.post('/product', (req, res)=>{
    const price = req.body.price
    const name = req.body.name

    res.json({
        message: `produto ${name} que custa ${price} foi cadastrado com sucesso`
    })
})

app.listen(3000)