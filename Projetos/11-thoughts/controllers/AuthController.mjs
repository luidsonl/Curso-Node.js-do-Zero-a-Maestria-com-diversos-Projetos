import { where } from "sequelize"
import User from "../models/User.mjs"
import bcrypt from 'bcryptjs'

class AuthController{
    static login(req, res){
        res.render('auth/login')
    }
    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, passwordConfirm} = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = false

        if(passwordConfirm != password){
            req.flash('message', 'A confirmação de senha não bate')
            error = true
        }

        if(!emailRegex.test(email)){
            req.flash('message', 'Formato inválido de e-mail')
            error = true
        }

        if(await User.findOne({where:{email: email}})){
            req.flash('message', 'Email já está em uso')
            error = true
        }

        if(error){
            res.render('auth/register', req.body)
        return
        }
        
        //Criação de senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try{
            const createdUser =  await User.create(user)

            //Inicializando session
            req.session.userId = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso')

            req.session.save(()=>{
                res.redirect('/')
            })

        }catch(err){
            console.log(err)
        }
    }
}

export default AuthController