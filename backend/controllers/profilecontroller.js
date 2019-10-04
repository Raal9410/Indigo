
const User = require('../models/User')

exports.editProfile = async(req, res, next) => {
  const enabledUpdatesUser = ['username',  'name', 'lastName', 'mainInstrument'];
  const updateUser = {};
  for (const key in req.body) {
    if (enabledUpdatesUser.includes(key))
      updateUser[key] = req.body[key];
    } 
  if(req.file){
    updateProfile.img = req.file.secure_url
  }
  console.log('asasdsadsads', req.file)
  const user = await User.findByIdAndUpdate(req.user.id, updateUser, {new: true})
  console.log(user)
  res.status(200).send({user});
}


exports.editInfluences = async(req, res, next)=>{
  const enabledUpdatesInfluences = ['musicInfluences'];
  const updateInfluences = {};
  for (const key in req.body) {
    if (enabledUpdatesInfluences.includes(key)) updateInfluences[key] = req.body.musicInfluences[key];
  }

  const User = await Profile.findByIdAndUpdate(req.user.id, updateinflueces, { new: true });

  res.status(200).send(profile);
}

