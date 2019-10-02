const {Schema, model} = require('mongoose')

const profileSchema = new Schema(
    {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    mainInstrument: String,
    musicInfluences: [Object],
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
)

module.exports = model('Profile', profileSchema)