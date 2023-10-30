import mongoose from "mongoose";

const PostSchema = new mongoose.Schema([{
    title: {
        type: String,
        trim: true,
        required: 'Title ${require}'
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    description: {
        type: String,
        trim: true,
        required: 'Description is required'
    },

    user: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'}],

    created: {
        type: Date,
        default: Date.now
    },

    updated: Date, String,

    salt: String,
    
<<<<<<< HEAD
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],

    likes: [{type: mongoose.Schema.ObjectId, ref:'User'}],
=======
    like: [{type: mongoose.Schema.ObjectId, ref:'Post'}],
    comment: [{type: mongoose.Schema.ObjectId, ref:'Post'}]
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
}]);

export default mongoose.model('Post', PostSchema);