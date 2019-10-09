const {Schema, model} = require('mongoose')

const postSchema = new Schema ({
 user: {
type: Schema.Types.ObjectId,
ref: 'User'
    },
    content: String,
}, 
{
    timestamps: true,
    versionKey: false
}
)

module.exports = model('Post', postSchema)