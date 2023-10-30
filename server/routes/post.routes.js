import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/posts')
  .get(postCtrl.list)
  .post(postCtrl.create);

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
