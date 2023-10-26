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
    
    like: [{type: mongoose.Schema.ObjectId, ref:'Post'}],
    comment: [{type: mongoose.Schema.ObjectId, ref:'Post'}]
}]);

export default mongoose.model('Post', PostSchema);