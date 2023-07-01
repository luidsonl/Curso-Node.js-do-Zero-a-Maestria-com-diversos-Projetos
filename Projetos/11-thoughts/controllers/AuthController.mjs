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

        if(passwordConfirm != password){
            req.flash('message', 'A confirmação de senha não bate')
        }

        if(!emailRegex.test(email)){
            req.flash('message', 'Formato inválido de e-mail')
        }

        res.render('auth/register', req.body)
        return
    }
}

export default AuthController