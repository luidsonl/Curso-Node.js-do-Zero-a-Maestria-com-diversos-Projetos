import jwt from 'jsonwebtoken'

async function createUserToken (user, req, res){
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'warispeace')

    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        userId: user ._id
    })
}

export default createUserToken 