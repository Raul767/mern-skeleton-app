import Post from '../models/post.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    return res.status(200).json({
      message: 'Post created successfully!'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let posts = await Post.find().select('title updated created');
    res.json(posts);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const postById = async (req, res, next, id) => {
  try {
    let post = await Post.findById({_id: id})
    .populate('like','_id name')
    .populate('comment','_id name')
    .exec();

    if(!post) {
      return res.status(400).json({
        error: 'Post not found'
      });
    }
    req.profile = post;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve post"
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = '';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
      try {
        let post = req.profile;
        post = extend(post, fields);
        post.updated = Date.now();  
        await post.save();
        post.hashed_password = '';
        post.salt = '';
        res.json(post);
      } catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
      });
    }
};


const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let post = req.profile;
    console.log('post to remove', post);
    let deletedPost = await post.deleteOne();
    res.json(deletedPost);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};


const addComment = async (req,res,) => {
  try{
    await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comment: req.body.commentId } });
      next();
  } catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};


const addLike = async (req, res) => {
  try{
    const result = await Post.findByIdAndUpdate(
      req.body.likeId,
      { $push: { likes: req.body.postId } },
      { new: true }
      )
      .populate('comment', '_id title')
      .populate('like', '_id title')
      .exec();
      res.json(result);
    } catch(err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };
  
  const removeComment = async (req,res,next) => {
    try{
      await Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { comment: req.body.uncommentId } });
        next();
    } catch (err) {
      return res.status(400).json({
        error:errorHandler.getErrorMessage()
      });
    }
  };
  
  const removeLike = async (req, res) => {
    try {
      const result = await Post.findByIdAndUpdate(
        req.body.unlikeId,
        { $pull: { likes: req.body.postId } },
        { new: true}
      )
      .populate('comment', '_id title')
      .populate('like', '_id title')
      .exec();
    res.json(result);
    } catch(err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage()
      });
    }
  };

export default {
  create,
  list,
  read,
  remove,
  postById,
  update,
  addComment,
  addLike,
  removeComment,
  removeLike
};
