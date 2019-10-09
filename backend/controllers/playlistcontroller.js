const Playlist = require('../models/Playlist')

// exports.createPlaylist = async(req, res, next) => {
//     const playlist = await Playlist.create({...req.body, user: req.user.id})
//     res.status(200).json(playlist)
// }

exports.getPlaylist = async(req, res, next)=>{
    const playlist = await Playlist.find({user:req.user.id})
    res.status(200).json(playlist)
}

exports.addTracks = async(req, res, next)=>{
    const updatePlaylist = {$push:{tracks:req.body.tracks}};
    const playlist = await Playlist.findByIdAndUpdate(req.user.id, updatePlaylist,{new: true})
    res.status(200).send({playlist});
}
  
exports.deleteTrack = async(req, res, next)=>{
const playlist = await Playlist.findById(req.user.id)
//console.log('asdjfjaskdnfjkads', user)
playlist.tracks = playlist.tracks.filter((track)=>{
return track.id !== req.params.id
})
// console.log('body', req.body)
// console.log('this shit', user.musicInfluences)
await playlist.save()
res.status(200).send({playlist}) 

}