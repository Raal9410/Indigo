const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    spotifyId: String,
    accessToken: String,
    name: {
      type: String,
    },
    lastName:{
      type: String
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

module.exports = model('User', userSchema);
