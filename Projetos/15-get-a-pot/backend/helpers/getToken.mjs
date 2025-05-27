
async function getToken(req) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return null;
    }
    let token = authHeader.split(' ')[1];
    if(!token){
        token = authHeader;
    }
    return token;
}

export default getToken;