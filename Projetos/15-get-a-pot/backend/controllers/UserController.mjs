import User from '../models/User.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import createUserToken from '../helpers/create-user-token.mjs';
import getToken from '../helpers/get-token.mjs';

class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword, image, isArtisan, phone } = req.body;
    
    // validations
    if (!name) {
      res.status(422).json({ message: 'Campo name é obrigatório' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'Campo email é obrigatório' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'Campo password é obrigatório' });
      return;
    }
    if (!confirmPassword) {
      res.status(422).json({ message: 'Campo confirmPassword é obrigatório' });
      return;
    }
    if (password != confirmPassword) {
      res.status(422).json({ message: 'O password e o confirmPassword devem ser iguais' });
      return;
    }
    
    const userFound = await User.findOne({ "email": email });
    if (userFound) {
      res.status(422).json({ message: 'Usuário com esse email já existe' });
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
      image: image,
      isArtisan: !!isArtisan,
      phone: phone
    });
    
    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
      return;
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }
  
  static async login(req, res) {
    const { email, password } = req.body;
    
    if (!email) {
      res.status(422).json({ message: 'Campo email é obrigatório' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'Campo password é obrigatório' });
      return;
    }
    
    const userFound = await User.findOne({ "email": email });
    if (!userFound) {
      res.status(422).json({ message: 'Email ou senha incorreto' });
      return;
    }
    
    const checkPassword = await bcrypt.compare(password, userFound.password);
    if (!checkPassword) {
      res.status(422).json({
        message: 'Email ou senha incorreto'
      });
      return;
    }
    
    await createUserToken(userFound, req, res);
  }
  
  static async checkUser(req, res) {
    let currentUser;
    
    if (req.headers.authorization) {
      const token = await getToken(req);

      const decoded = jwt.verify(token, 'warispeace');


      currentUser = await User.findById(decoded.id);

      if(currentUser){
        console.log(currentUser);
        currentUser.password = undefined;
      }
      
      
    } else {
      currentUser = null;
    }
    
    res.status(200).send(currentUser);
  }
}

export default UserController;