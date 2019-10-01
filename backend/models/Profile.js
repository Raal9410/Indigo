const {Schema, model} = require('mongoose')

const userProfile = new Schema(
    {
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        }],
    mainInstrument: {
      type: String,
      required: true
    },
    musicInfluences: [Object],
    },
    {
    timestamps: true,
    versionKey: false
    }
)

module.exports = model('Profile', userProfile)