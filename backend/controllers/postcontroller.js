const Post = require('./../models/Post')

exports.createPost= async(req, res, next)=>{
    const post = await Post.create([...req.body])
    res.status(200).json({post})
}

exports.userPost= async(req, res, next) =>{
    const user = User.findById(req.user._id)
    const post = Post.findOne({user: req.user._id})
    res.status(200).json({user, post})
}

exports.editPost = async(req, res,next)=>{
    const {id} = req.body.id
    const post = await Post.findByIdAndUpdate(id)
    res.status(200).json({post})
}

exports.deletePost = async(req, res, next)=>{
    const {id} = req.body.id
    const post = await Post.findByIdAndDelete(id)
    res.status(200).json({post})
}