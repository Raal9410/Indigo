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
    }  
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'username' });

module.exports = model('User', userSchema);
