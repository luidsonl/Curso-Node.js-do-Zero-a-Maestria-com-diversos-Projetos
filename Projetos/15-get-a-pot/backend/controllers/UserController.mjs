import User from '../models/User.mjs';
import bcrypt from 'bcrypt'

class UserController {
  static async register(req, res) {
   
    const { name, email, password, confirmPassword, image, isArtisan, phone } = req.body
    
    // validations
    if (!name){
        res.status(422).json({message: 'Campo name é obrigatório'})
        return
    }
    if (!email){
      res.status(422).json({message: 'Campo email é obrigatório'})
      return
    }
    if (!password){
      res.status(422).json({message: 'Campo password é obrigatório'})
      return
    }
    if (!confirmPassword){
      res.status(422).json({message: 'Campo confirmPassword é obrigatório'})
      return
    }

    if(password != confirmPassword){
      res.status(422).json({message: 'O password e o confirmPassword devem ser iguais'})
      return
    }

    const userExists = await User.findOne({"email": email})

    if(userExists){
      res.status(422).json({message: 'Usuário com esse email já existe'})
      return
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
      image: image,
      isArtisan: isArtisan,
      phone: phone

    })

    try {
      const newUser = await user.save()
      res.status(201).json({
        message: 'Usuário criado',
        newUser,
      })
      return

    } catch (error) {
      res.status(500).json({message: error})
      return
    }
    
 
  }
}

export default UserController;
