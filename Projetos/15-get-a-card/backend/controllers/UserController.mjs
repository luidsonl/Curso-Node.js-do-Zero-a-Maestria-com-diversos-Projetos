import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getToken from '../helpers/getToken.mjs';
import UserService from '../services/UserService.mjs';
import AuthService from '../services/AuthService.mjs';
import MediaService from '../services/MediaService.mjs';
import pick from '../helpers/pick.mjs';
import validateObjectId from '../helpers/validateObjectId.mjs';

class UserController {

  static async register(req, res) {
    const data = pick(req.body, ['name', 'email', 'password', 'confirmPassword', 'image', 'phone']);
      
    try {
      const newUser = await UserService.createUser(data);
      const userToken = await AuthService.createUserToken(newUser);

      res.status(200).json({
        message: 'Você está autenticado',
        token: userToken,
        userId: newUser ._id
      })
      
    } catch (error) {
      res.status(error.httpCode ?? 500).json({ 
        message: 'Erro ao registrar usuário', 
        error: error.message 
      });
    }
  }

  static async login(req, res) {
    try {
      const data = pick(req.body, ['email', 'password']); 
      const user = await UserService.loginUser(data);

      const userToken = await AuthService.createUserToken(user);
      
      res.status(200).json({
        message: 'Você está autenticado',
        token: userToken,
        userId: user ._id
      })
      
    } catch (error) {
      res.status(error.httpCode ?? 500).json({ 
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
      return res.status(error.httpCode ?? 500).json({ 
        message: 'Erro ao verificar usuário', 
        error: error.message 
      });
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id;

      if(!validateObjectId(id)){
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const user = await UserService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.status(200).json(user);
      
    } catch (error) {
      return res.status(error.httpCode ?? 500).json({ 
        message: 'Erro ao buscar usuário', 
        error: error.message 
      });
    }
  }

  static async update(req, res){
    
    try {
      const token = await getToken(req);
      const data = pick(req.body, ['name', 'email', 'password', 'confirmPassword', 'phone']);
      if (req.files){
        data['image'] = req.files.image;
      }
      
      const updatedUser = await UserService.updateOneUser(token, data)
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(error.httpCode ?? 500).json({ 
        message: 'Erro ao atualizar usuário', 
        error: error.message 
      });
    }
  }
}

export default UserController;