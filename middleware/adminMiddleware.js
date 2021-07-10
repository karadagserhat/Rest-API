const admin = (req, res, next) => {

    if(req.user && !req.user.isAdmin) {
        return res.status(403).json({
            mesaj: 'Erişim engellendi. Sen admin değilsin'
        })
    }
    next()
}

module.exports = admin