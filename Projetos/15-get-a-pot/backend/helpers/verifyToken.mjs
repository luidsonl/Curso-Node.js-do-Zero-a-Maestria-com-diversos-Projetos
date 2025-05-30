import jwt from 'jsonwebtoken'
import getToken from './getToken.mjs';

//middleware
async function verifyToken(req, res, next){
    const token = await getToken(req)

    if(!token){
        return res.status(401).json({
            message: 'Acesso negado'
        })
    }

    try {
        const verified = jwt.verify(token, 'warispeace')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({
            message: 'Token inválido'
        })
    }
}

export default verifyToken;