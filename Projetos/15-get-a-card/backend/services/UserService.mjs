import FieldValidator from '../helpers/FieldValidator.mjs';
import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthService from './AuthService.mjs';


class UserService{
    static async createUser(data){

        const { name, email, password, confirmPassword, image, isArtisan, phone } = data;


        const requiredFields = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        
        for (const [field, value] of Object.entries(requiredFields)){
            if(!FieldValidator.requiredField(value)){
                throw new Error(`Campo ${field} é obrigatório`);
            }
        }

        if(!FieldValidator.fieldsAreEqual(password, confirmPassword)){
            throw new Error('password e confirmPassword precisam ser iguais');
        }
        
        const userFound = await User.findOne({ email });
        
        if (userFound) {
            throw new Error('email já está em uso');
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

        return newUser;
    }

    static async loginUser(data){
        const { email, password } = data;
              
        const requiredFields = {
            email: email,
            password: password
        };
        
        for (const [field, value] of Object.entries(requiredFields)){
            if(!FieldValidator.requiredField(value)){
                throw new Error(`Campo ${field} é obrigatório`);
            }
        }
        
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Email ou senha incorretos');
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email ou senha incorretos');
        }

        return user;
              
    }

    static async getUserById(id){
        const currentUser = await User.findById(id).select('-password');

        return currentUser;
    }

    static async getUserByToken(token){

        if(!token){
            return null;
        }

        const decode = AuthService.decodeToken(token);

        const userId = decode.id;

        const user = await User.findById(userId);
        
        return user;
    }

    static async getOneUser(data){
        const user = await User.findOne(data)

        return user
    }

    static async updateOneUser(data){

    }
}

export default UserService;

