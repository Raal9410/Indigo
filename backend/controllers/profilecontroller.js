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
const user = await User.findById(req.user.id)
console.log('asdjfjaskdnfjkads', user)
user.musicInfluences = user.musicInfluences.filter((currentMI)=>{
return currentMI.id !== req.params.id
})
console.log('body', req.body)
console.log('this shit', user.musicInfluences)
await user.save()
res.status(200).send({user}) 
}

