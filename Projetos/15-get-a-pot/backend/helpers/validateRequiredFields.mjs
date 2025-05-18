function validateRequiredFields(req, res, fields) {
    for (const [field, label] of Object.entries(fields)) {
        if (!req.body[field]) {
            res.status(422).json({ message: `Campo ${label} é obrigatório` });
            return false;
        }
    }
    return true;
}

export default validateRequiredFields;