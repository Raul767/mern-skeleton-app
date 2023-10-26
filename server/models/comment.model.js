import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema([{
    comment: {
        type: String,
        trim: true,
        required: 'Comment is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

    user: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    post: [{type: mongoose.Schema.ObjectId, ref: 'Post'}],
    like: [{type: mongoose.Schema.ObjectId, ref: 'Like'}]
}]);

export default mongoose.model('Comment', CommentSchema);