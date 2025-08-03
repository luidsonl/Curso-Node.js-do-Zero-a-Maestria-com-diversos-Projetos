import FieldValidator from '../helpers/FieldValidator.mjs';
import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import AuthService from './AuthService.mjs';
import pick from '../helpers/pick.mjs';
import MediaService from './MediaService.mjs';


class UserService{
    static async createUser(data){

        const { name, email, password, confirmPassword, phone } = data;


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

        if (phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.length < 8 || digits.length > 15) {
            throw new Error('Telefone inválido: deve conter entre 8 e 15 dígitos');
            }
        }

        
        const userFound = await User.findOne({ email });
        
        if (userFound) {
            const error = new Error('email já está em uso')
            error.httpCode = 403;

            throw error;
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = new User({
            name,
            email,
            password: passwordHash,
            phone
        });
        
        const newUser = await user.save();
        const userObj = newUser.toObject();
        delete userObj.password;
        return userObj;
    }

    static async loginUser(data) {
        const { email, password } = data;
        
        const requiredFields = { email, password };
        
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!FieldValidator.requiredField(value)) {
                const error = new Error(`Campo ${field} é obrigatório`);
                error.httpCode = 400;
                throw error;
            }
        }
        
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error('Email ou senha incorretos');
            error.httpCode = 401;
            throw error;
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            const error = new Error('Email ou senha incorretos');
            error.httpCode = 401;
            throw error;
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

    static async updateOneUser(token, data){

        const { email, password, confirmPassword, image } = data;

        const userToUpdate = await this.getUserByToken(token);

       
        if (!userToUpdate) {
            const error = new Error('Acesso negado');
            error.httpCode = 404;
            throw error;
        }

        if (email !== undefined) {
            const emailInUse = !!(await this.getOneUser({ email }));

            if (userToUpdate.email !== email && emailInUse) {
            const error = new Error('Email indisponível');
            error.httpCode = 409;
            throw error;
            }
        }

        if (password !== undefined) {
            if (password !== confirmPassword) {
            const error = new Error('As senhas não conferem');
            error.httpCode = 400;
            throw error;
            } else {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            userToUpdate.password = passwordHash;
            }
        }
        
        const fieldsToUpdate = pick(data, ['name', 'email', 'phone'])
        
        Object.entries(fieldsToUpdate).forEach(([key, value]) => {

            if (value !== undefined) {
            userToUpdate[key] = value;
            }
        });

        
        if(image){
            const profilePicture = await MediaService.create(image, userToUpdate, 'profiles', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
            if(userToUpdate.profilePicture){
                await MediaService.deleteById(userToUpdate.profilePicture);
            }
            userToUpdate.profilePicture = profilePicture;
        }

        const updatedUser = await User.findOneAndUpdate(
            {_id: userToUpdate._id},
            {$set: userToUpdate},
            {new: true}
        ).select('-password');
        
        return updatedUser;
        

    }
}

export default UserService;

