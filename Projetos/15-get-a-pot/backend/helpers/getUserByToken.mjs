import jwt from 'jsonwebtoken'
import User from '../models/User.mjs'

// get user by token

async function getUserByToken(token){
    
    if(!token){
        return null;
    }

    const decode = jwt.verify(token, 'warispeace');

    const userId = decode.id;

    const user = await User.findById(userId);

    return user;
}


export default getUserByToken;