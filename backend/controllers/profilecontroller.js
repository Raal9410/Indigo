const Profile = require('../models/Profile')
const User = require('../models/Profile')

exports.editProfile = async(req, res, next) => {
  const enabledUpdatesProfile = ['mainInstrument',  'profileImg', 'musicInfluences'];
  const enabledUpdatesUser = ['username',  'name', 'lastName'];
  const updateProfile = {};
  const updateUser = {};
  for (const key in req.body) {
    if (enabledUpdatesProfile.includes(key)){
      updateProfile[key] = req.body[key];
    } else if (enabledUpdatesUser){
      updateUser[key] = req.body[key]
    }
  }
  const profile = await Profile.findOneAndUpdate({user:req.user.id}, updateProfile, { new: true }).populate('user');
  const user = await User.findByIdAndUpdate(req.user._id)
  res.status(200).send({profile, user});
}


exports.editInfluences = async(req, res, next)=>{
  const enabledUpdates = ['musicInfluences'];
  const updates = {};
  for (const key in req.body) {
    if (enabledUpdates.includes(key)) updates[key] = req.body[key];
  }

  const user = await Profile.findByIdAndUpdate(req.user.id, updates, { new: true });

  res.status(200).send(user);
}

