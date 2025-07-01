
async function getToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    const token = parts.length === 2 ? parts[1] : authHeader;

    return token;
}

export default getToken;