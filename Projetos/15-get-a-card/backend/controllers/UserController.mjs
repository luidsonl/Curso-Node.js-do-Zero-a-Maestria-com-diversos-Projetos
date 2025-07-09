import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getToken from '../helpers/getToken.mjs';
import FileService from '../services/MediaService.mjs';
import UserService from '../services/UserService.mjs';
import AuthService from '../services/AuthService.mjs';

class UserController {

  static async register(req, res) {
    const data = req.body;
      
    try {
      const newUser = await UserService.createUser(data);
      const userToken = await AuthService.createUserToken(newUser);

      res.status(200).json({
        message: 'Você está autenticado',
        token: userToken,
        userId: newUser ._id
      })
      
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao registrar usuário', 
        error: error.message 
      });
    }
  }

  static async login(req, res) {
    try {
      const data = req.body; 
      const user = await UserService.loginUser(data);

      const userToken = await AuthService.createUserToken(user);
      
      res.status(200).json({
        message: 'Você está autenticado',
        token: userToken,
        userId: user ._id
      })
      
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao fazer login', 
        error: error.message 
      });
    }
  }

  static async check(req, res) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso negado: token não fornecido' });
      }
      
      const token = await getToken(req);
      
      const decoded = AuthService.decodeToken(token);
      
      const currentUser = await UserService.getUserById(decoded.id);
      
      if (!currentUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.status(200).json(currentUser);
      
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return res.status(500).json({ 
        message: 'Erro ao verificar usuário', 
        error: error.message 
      });
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id;
      
      const user = await UserService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.status(200).json(user);
      
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ 
        message: 'Erro ao buscar usuário', 
        error: error.message 
      });
    }
  }

  static async update(req, res){

    const token = await getToken(req)
    const user = await UserService.getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if(req.file){
      if (user.image){
        FileService.remove();
      }
      user.image = req.file.filename;
    }
    
    const fieldsToUpdate = req.body;

    if(fieldsToUpdate.email != undefined){
      const emailInUse = !!(await UserService.getOneUser({email: fieldsToUpdate.email}))

      if (user.email !== fieldsToUpdate.email && emailInUse){
        res.status(422).json({
          message: 'Email indisponível'
        })
        return;
      }
    }
    
    if(fieldsToUpdate.password != undefined){
      if(fieldsToUpdate.password != fieldsToUpdate.confirmPassword){
        res.status(422).json({
          message: 'As senhas não conferem!'
        })
        return;
      }else{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(fieldsToUpdate.password, salt);

        fieldsToUpdate.password = passwordHash;
      }
    }

    
    Object.entries(fieldsToUpdate).forEach(([key, value]) => {
      if (value !== undefined) {
        user[key] = value;
      }
    });

    try {
      const updatedUser = await User.findOneAndUpdate(
        {_id: user.id},
        {$set: user},
        {new: true}
      );
      return res.status(200).json({
        message:'Usuário atualizado com sucesso',
        user: updatedUser
      })
    } catch (error) {
      return res.status(500).json({
        message: error
      })

     
    }
  }
}

export default UserController;