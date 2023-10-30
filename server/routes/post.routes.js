import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/posts')
  .get(postCtrl.list)
  .post(postCtrl.create);

<<<<<<< HEAD
  router.route('/api/posts/addcomment')
  .post(postCtrl.addCommentToPost);

  router.route('/api/posts/like')
  .put(postCtrl.addLikePost);
  
  router.route('/api/posts/unlike')
  .put(postCtrl.addunlikePost);
  
router.route('/api/posts/:postId')
  .get(authCtrl.requireSignin, postCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.remove);

router.param('postId', postCtrl.postById);

export default router;
=======
router.route('/api/posts/comment')
  .put(authCtrl.requireSignin,
  postCtrl.addComment)

router.route('/api/posts/like')
  .put(authCtrl.requireSignin,
  postCtrl.addComment,
  postCtrl.addLike)

router.route('/api/posts/unlike')
  .put(authCtrl.requireSignin,
  postCtrl.removeComment,
  postCtrl.removeLike)
  
  router.route('/api/posts/:postId')
  .get(authCtrl.requireSignin, postCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.remove);
  
  router.param('postId', postCtrl.postById);

export default router;
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
