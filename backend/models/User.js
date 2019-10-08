const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose')
const userSchema = new Schema(
  {
    spotifyId: String,
    accessToken: String,
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
  mainInstrument: String,
  musicInfluences: [Object],
  img: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  },
  friends : [String]  
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, {usernameField: 'username'})
module.exports = model('User', userSchema);
