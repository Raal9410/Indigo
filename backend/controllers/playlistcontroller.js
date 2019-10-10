const Playlist = require('../models/Playlist')

exports.getPlaylist = async(req, res, next)=>{
    const playlist = await Playlist.find({user:req.user.id})
    res.status(200).json(playlist)

}

exports.addTrack = async(req, res, next)=>{
    const updatePlaylist = {$push:{tracks:req.body.tracks}};
    const playlist = await Playlist.findOneAndUpdate({user:req.user.id}, updatePlaylist,{new: true})
    res.status(200).send({playlist});
}
  
exports.deleteTrack = async(req, res, next)=>{
const playlist = await Playlist.findOne({user: req.user.id})
playlist.tracks = playlist.tracks.filter((track)=>{
return track.id !== req.params.id
})
await playlist.save()
res.status(200).send({playlist}) 

}