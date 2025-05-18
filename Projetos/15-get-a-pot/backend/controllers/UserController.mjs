import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createUserToken from '../helpers/createUserToken.mjs';
import getToken from '../helpers/getToken.mjs';
import validateRequiredFields from '../helpers/validateRequiredFields.mjs';

class UserController {
  // Método de validação de campos para reutilização

  static async register(req, res) {
    try {
      const { name, email, password, confirmPassword, image, isArtisan, phone } = req.body;
      
      const requiredFields = {
        name: 'name',
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword'
      };
      
      if (!validateRequiredFields(req, res, requiredFields)) return;
      
      if (password !== confirmPassword) {
        return res.status(422).json({ 
          message: 'O password e o confirmPassword devem ser iguais' 
        });
      }
      
      const userFound = await User.findOne({ email });
      if (userFound) {
        return res.status(422).json({ message: 'Usuário com esse email já existe' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      const user = new User({
        name,
        email,
        password: passwordHash,
        image,
        isArtisan: !!isArtisan,
        phone
      });
      
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
      
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
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

  static async checkUser(req, res) {
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

  static async getUserById(req, res) {
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

  static async editUser(req, res){
    return res.status(200).json({
      message: 'Chegou aqui'
    })
  }
}

export default UserController;