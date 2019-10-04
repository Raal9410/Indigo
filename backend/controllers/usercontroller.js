const User = require('../models/User')

exports.userLogin = async(req, res, next) => {
    const {user} = req
    res.status(200).json(user)
}

exports.logout = async(req, res, next)=>{
    req.logout()
    res.status(200).json({msg: 'Logged out'})
}

exports.getProfile = async(req, res, next)=>{
    
    res.status(200).json(req.user)
}