import FieldValidator from '../helpers/FieldValidator.mjs';
import User from '../models/User.mjs';
import bcrypt from 'bcrypt';


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
}

export default UserService;

