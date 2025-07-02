import getToken from '../helpers/getToken.mjs';
import AuthService from '../services/AuthService.mjs';

//middleware
async function verifyTokenMiddleware(req, res, next){
    const token = await getToken(req)

    if(!token){
        return res.status(401).json({
            message: 'Acesso negado'
        })
    }

    try {
        const verified = AuthService.decodeToken(token)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({
            message: 'Token inválido'
        })
    }
}

export default verifyTokenMiddleware;