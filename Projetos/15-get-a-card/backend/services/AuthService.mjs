import jwt from 'jsonwebtoken';

class AuthService{
    static async createUserToken (user){
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, 'warispeace')
        
        return token;
    }

    static decodeToken(token){
        const decoded = jwt.verify(token, 'warispeace');

        return decoded;
    }
}

export default AuthService;