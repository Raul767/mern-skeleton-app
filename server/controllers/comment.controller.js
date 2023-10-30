import Comment from '../models/comment.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';
import { extend } from 'lodash';

const create = async(req, res) => {
    const comment = new Comment(req.body);
    try{
        await comment.save();
        return res.status(200).json({
            message: 'Comment created successfully!'
        });
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async(req, res) => {
    try{
<<<<<<< HEAD
        let comments = await Comment.find().select('description user updated created');
=======
        let comments = await Comment.find().select('comment updated created');
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
        res.json(comments);
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const commentById = async (req, res, next, id) => {
    try{
        let comment = await Comment.findById({_id: id}) 
<<<<<<< HEAD
        .populate('following','_id ')
        .populate('followers', '_id ')
=======
        .populate('like','_id like')
        .populate('post', '_id title')
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
        .populate('user', '_id name')
        exec();

        if(!comment){
            return res.status(400).json({
                error: 'Post not found'
            });
        }
        req.profile = comment;
        next();
    } catch(err) {
        console.log(err);
        return res.status(400).json({
<<<<<<< HEAD
            error: "Could not retrieve comment"
=======
            error: "Could not retrieve post"
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = '';
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try{
        let comment = req.profile;
        comment = extend(post, fields);
        comment.updated = Date.now();
        await post.save();
        res.json(comment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async(req, res, next) => {
    try{
        console.log('deleted');
        let comment = req.profile;
        console.log('comment to remove', comment);
        let deletedComment = await comment.deleteOne();
        res.json(deletedComment); 
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

<<<<<<< HEAD
const addlikeComment = async (req, res) => {
    try {
      const { userId, commentId } = req.body;
  
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
  
      res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({
        error: "No se pudo dar 'me gusta' al comentario."
      });
    }
  };
  
  // Quitar "me gusta" de un comentario
  const addunlikeComment = async (req, res) => {
    try {
      const { userId, commentId } = req.body;

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      );
  
      res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({
        error: "No se pudo quitar 'me gusta' del comentario."
      });
    }
  };
 
=======
const addLike = async (req, res) => {
    try {
        const result = await Comment.findByIdAndUpdate(
            req.body.likeId,
            { $push: {likes: req.body.commentId}},
            { new: true }
        )
        .populate('comment', '_id comment')
        .populate('like', '_id like')
        .exec();
        res.json(result);
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const removeLike = async(req, res) => {
try{
    const result = await Comment.findByIdAndUpdate(
        req.body.unlikeId,
        { $pull: { likes: req.body.commentId} },
        { new: true }
    )
    .populate('comment', '_id comment')
    .populate('like', '_id like')
    .exec();
    res.json(result);
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage()
        });
    }
};

>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
export default{
    create,
    list,
    read,
    remove,
    commentById,
    update,
<<<<<<< HEAD
    addlikeComment,
    addunlikeComment
  };
=======
    addLike,
    removeLike
}
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
