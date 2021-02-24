import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    caption: String,
    url: String,
    likecount: {
        type: Number,
        default: 0
    },
    createdon: {
        type: Date,
        default: new Date()
    },
});

postSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
postSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});


const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;