const {Schema, model} = require('mongoose')

const playlistSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tracks:[Object],
}, 
{
    timestamps: true,
    versionKey: false
}
)

module.exports = model('Playlist', playlistSchema)