const User = require('../models/User')

exports.editProfile = async(req, res, next) => {
  const enabledUpdatesUser = ['username',  'name', 'lastName', 'mainInstrument' ];
  const updateUser = {};
  for (const key in req.body) {
    if (enabledUpdatesUser.includes(key))
      updateUser[key] = req.body[key];
    } 
  if(req.file){
    updateUser.img = req.file.secure_url
  }
  if(req.body.musicInfluences){
    updateUser['$push']={musicInfluences:req.body.musicInfluences}
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateUser,{new: true})
  res.status(200).send({user});
}

exports.deleteInfluences = async(req, res, next)=>{
const user = await User.findById(req.user.id)
user.musicInfluences = user.musicInfluences.filter((currentMI)=>{
return currentMI.id !== req.params.id
})
await user.save()
res.status(200).send({user}) 
}

