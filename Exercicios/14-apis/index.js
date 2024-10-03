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
    res.status(200).json({
        message: 'olá mundo'
    })
})

app.post('/product', (req, res)=>{
    const price = req.body.price
    const name = req.body.name

    if(!name){
        res.status(422).json({
            message: "o campo 'nome' é obrigatório"
        })
    }

    res.status(201).json({
        message: `produto ${name} que custa ${price} foi cadastrado com sucesso`
    })
})

app.listen(3000)