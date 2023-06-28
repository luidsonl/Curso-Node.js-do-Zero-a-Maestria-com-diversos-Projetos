import express from "express"
import exphbs from "express-handlebars"
import session from "express-session"
import FileStoreModule from "session-file-store"
import flash from "express-flash"
import conn from "./db/conn.mjs"

//importando rotas
import thoughtsRoutes from "./routes/thoughtsRoutes.mjs"
import authRoutes from "./routes/authRoutes.mjs"

//controllers
import ThoughtController from "./controllers/ThoughtController.mjs"

//Middlewares
import sessionMiddleware from "./middlewares/sessionConfig.mjs"

// models
import Thought from "./models/Thought.mjs"
import User from "./models/User.mjs"



const app = express()

//Template engine
app.engine('handlebars' , exphbs.engine())
app.set('view engine', 'handlebars')

//Respostas do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Middlewares
app.use(
    sessionMiddleware
)

// Public path
app.use(express.static('public'))

// Flash messages
app.use(flash())

// configurar sessão para resposta
app.use((req, res, next)=>{
    if(req.session.userId){
        res.locals.session = req.session
    }
    next()
})

// Rotas
app.use('/', thoughtsRoutes)
app.use('/', authRoutes)


conn
//.sync({force: true})
.sync()
.then(()=>{
    app.listen(3000)

}).catch((err)=>{
    console.log(err)
})