const User = require('../models/User')
const Playlist = require('../models/Playlist')
exports.registerUser = async(req, res, next)=>{
    const { username, password, name, lastName} = req.body;
    const user = await User.register({username, name, lastName}, password)
    const playlist = await Playlist.create({...req.body, user: user._id})
    res.status(200).send((user, playlist))
}

exports.userLogin = async(req, res, next) => {
    const {user} = req
    res.status(200).json(user)
}

exports.logout = async(req, res, next)=>{
    req.logout()
    res.status(200).json({msg: 'Logged out'})
}

exports.getProfile = async(req, res, next)=>{
    const user = await User.findById(req.user._id)
    console.log(req.user)
    res.status(200).json(user)
}

exports.getAllUsers = async(req,res,next)=>{
    const users = await User.find()
    console.log(users)
    res.status(200).json(users)
}