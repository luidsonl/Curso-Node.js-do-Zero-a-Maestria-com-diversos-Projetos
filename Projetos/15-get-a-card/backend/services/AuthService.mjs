import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService{
    static async createUserToken (user){
        const token = jwt.sign(
            {
            name: user.name,
            id: user._id,
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        return token;
    }

    static decodeToken(token){
        const decoded = jwt.verify(token, JWT_SECRET);

        return decoded;
    }
}

export default AuthService;