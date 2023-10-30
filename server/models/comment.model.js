import mongoose from 'mongoose';

<<<<<<< HEAD
const require = 'field is required';

const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: `Text ${require}`
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId,ref: 'User'}],

  });
  
  export default mongoose.model('Comment', commentSchema);
=======
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
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
