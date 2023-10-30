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
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],

    likes: [{type: mongoose.Schema.ObjectId, ref:'User'}],
}]);

export default mongoose.model('Post', PostSchema);