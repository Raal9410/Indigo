const Post = require('../models/Post')

exports.createPost= async(req, res, next)=>{
    const post = await Post.create({...req.body, user: req.user.id})
    res.status(200).json(post)
}

exports.userPost= async(req, res, next) =>{
    const post = await Post.find({user: req.user._id}).populate('user')
    res.status(200).json(post)
}

exports.editPost = async(req, res,next)=>{
    const {id} = req.body.id
    const post = await Post.findByIdAndUpdate(id)
    res.status(200).json({post})
}

exports.deletePost = async(req, res, next)=>{
    const {id} = req.params
    const post = await Post.findByIdAndDelete(id)
    res.status(200).json({post})
}