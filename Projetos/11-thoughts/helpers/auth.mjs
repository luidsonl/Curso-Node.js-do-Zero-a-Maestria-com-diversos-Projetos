const checkAuth = function(req, res, next){
    let userId = req.session.userId

    if(!userId){
        res.redirect('/login')
    }
    next()
}

export default checkAuth