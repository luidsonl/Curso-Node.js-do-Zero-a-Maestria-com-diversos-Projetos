import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import productRoutes from './routes/productRoutes.js'

conn()

const app = express()


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// read body
app.use(
    express.urlencoded({
        extended: true
    })
)


app.use(express.static('public'))
app.use('/products', productRoutes)
app.listen(3000)