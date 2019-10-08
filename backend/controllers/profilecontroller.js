const User = require('../models/User')

exports.editProfile = async(req, res, next) => {
  const enabledUpdatesUser = ['username',  'name', 'lastName', 'mainInstrument', ];
  const updateUser = {$push:{musicInfluences:req.body.musicInfluences}};
  for (const key in req.body) {
    if (enabledUpdatesUser.includes(key))
      updateUser[key] = req.body[key];
    } 
  if(req.file){
    updateUser.img = req.file.secure_url
  }
  console.log('asasdsadsads', req.file)
  const user = await User.findByIdAndUpdate(req.user.id, updateUser,{new: true})
  console.log(user)
  res.status(200).send({user});
}

exports.deleteInfluences = async(req, res, next)=>{
const user = await User.findByIdAndDelete()
user.musicInfluences = user.musicInfluences.filter((currentMI)=>{
return currentMI.id !== req.body.id
})
await user.save()
res.status(200).send({user}) 
}

