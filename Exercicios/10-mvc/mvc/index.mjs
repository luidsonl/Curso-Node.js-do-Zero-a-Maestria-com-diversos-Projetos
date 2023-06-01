import express from "express";
import exphbs from 'express-handlebars'
import conn from './db/conn.mjs'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(express.static('public'))

app.listen(3000)