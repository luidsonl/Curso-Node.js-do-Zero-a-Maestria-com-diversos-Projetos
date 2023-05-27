import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.mjs'
import User from './models/User.mjs'
import Address from './models/Adress.mjs'

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

app.get('/', async (req, res)=>{

    const users = await User.findAll({raw: true})
    res.render('home', {users: users})
})

app.get('/users/create', (req, res)=>{
    res.render('adduser')
})

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id

    try{
        const user = await User.findOne({include: Address, where: {id: id}})
        res.render('userview', {user: user.get({plain: true})})
    }catch(err){
        console.log(err)
    }
})

app.get('/users/edit/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const user = await User.findOne({include: Address, where: {id: id}})
        res.render('useredit', {user: user.get({plain: true})})
    }catch(err){
        console.log(err)
    }
    
})

//rotas post ------------------------------------------------------------------------------
app.post('/users/create', async (req, res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter ==='on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.post('/users/delete/:id', async (req, res)=>{
    const id = req.params.id
    await User.destroy({where: {id: id}})
    res.redirect('/')
})
app.post('/users/update', async(req, res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter=='on'){
        newsletter = true
    }else{
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }
    await User.update(userData, {where:{id: id}})
    res.redirect('/')
})

app.post('/address/create', async(req, res)=>{
    const userId = req.body.userId
    const neighborhood = req.body.neighborhood
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country

    const address = {
        userId,
        neighborhood,
        street,
        number,
        city,
        state,
        country,
    }
    await Address.create(address)

    res.redirect(`/users/edit/${userId}`)
})

app.post('/address/delete', async(req,res)=>{
    const userId = req.body.userId
    const id = req.body.id

    await Address.destroy({
        where: {id: id}
    })
    res.redirect(`/users/edit/${userId}`)
})

//------------------------------------------------
conn.sync({}).then(()=>{
    app.listen(3000)
}).catch((err)=>{console.log(err)})
