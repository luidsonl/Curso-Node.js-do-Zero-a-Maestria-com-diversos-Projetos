import jwt from 'jsonwebtoken'

const createUserToken = async (user, req, res)=>{
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'warispeace')

    res.status(200).json({
        message: 'Você está autenticado',
        token: token
    })
}

export default createUserToken 