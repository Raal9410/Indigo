const User = require('../models/User')
const Profile = require('../models/Profile')

exports.registerUser = async(req, res, next)=>{
    const { username, password, name, lastName} = req.body;
    const user = await User.register({username, name, lastName}, password)
    const profile = await Profile.create({user: user._id})
    res.status(200).send({user, profile})
}

exports.userLogin = async(req, res, next) => {
    const {user} = req
    const userProfile = await Profile.findOne({user:user._id})
    console.log(userProfile)
    res.status(200).json({user, userProfile})
}

exports.logout = async(req, res, next)=>{
    req.logout()
    res.status(200).json({msg: 'Logged out'})
}

exports.getProfile = async(req, res, next)=>{
    const profile = await Profile.findOne({user:user._id})
    console.log(profile)
    const user = await User.findById(req.user.id)
    res.status(200).json({user, profile})
}