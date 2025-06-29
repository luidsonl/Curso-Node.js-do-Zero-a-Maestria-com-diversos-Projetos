import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createUserToken from '../helpers/createUserToken.mjs';
import getToken from '../helpers/getToken.mjs';
import validateRequiredFields from '../helpers/validateRequiredFields.mjs';
import getUserByToken from '../helpers/getUserByToken.mjs';
import FileService from '../services/FileService.mjs';
import UserService from '../services/UserService.mjs';

class UserController {
  // Método de validação de campos para reutilização

  static async register(req, res) {
    const data = req.body;
      
    try {
      const newUser = await UserService.createUser(data)
      await createUserToken(newUser, req, res);
      
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao registrar usuário', 
        error: error.message 
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const requiredFields = {
        email: 'email',
        password: 'password'
      };
      
      if (!validateRequiredFields(req, res, requiredFields)) return;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(422).json({ message: 'Email ou senha incorreto' });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(422).json({ message: 'Email ou senha incorreto' });
      }
      
      await createUserToken(user, req, res);
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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
      
      const decoded = jwt.verify(token, 'warispeace');
      
      const currentUser = await User.findById(decoded.id).select('-password');
      
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
      
      const user = await User.findById(id).select('-password');
      
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
    const user = await getUserByToken(token);

    if(req.file){
      if (user.image){
        FileService.removeFile('profile-pictures', user.image );
      }
      user.image = req.file.filename;
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // name, email, password, confirmPassword, image, isArtisan, phone
    const fieldsToUpdate = req.body;

    if(fieldsToUpdate.email != undefined){
      const emailInUse = !!(await User.findOne({email: fieldsToUpdate.email}))

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