const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    friends : [
      {
        type: Schema.Types.ObjectId,
        ref: 'User' 
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'username' });

module.exports = model('User', userSchema);
