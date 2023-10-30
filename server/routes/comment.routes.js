<<<<<<< HEAD
import express from 'express';
=======
import express  from "express";
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
import commentCtrl from '../controllers/comment.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/comments')
<<<<<<< HEAD
  .get(commentCtrl.list) 
  .post(commentCtrl.create);
  
router.route('/api/comments/like')
.put(commentCtrl.addlikeComment);

router.route('/api/comments/unlike')
.put(commentCtrl.addunlikeComment);

router.route('/api/comments/:commentId')
  .get(authCtrl.requireSignin, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.remove);

router.param('commentId', commentCtrl.commentById);

export default router;
=======
    .get(commentCtrl.list)
    .post(commentCtrl.create);

router.route('/api/comments/like')
    .put(authCtrl.requireSignin,
    commentCtrl.addLike)

router.route('/api/comments/unlike')
    .put(authCtrl.requireSignin,
        commentCtrl.removeLike)

router.route('/api/comments/:commentId')
    .get(authCtrl.requireSignin, commentCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.remove);

router.param('commentId', commentCtrl.commentById)

export default router;
>>>>>>> 1bcdf7efad52f42023c02719a5f7f3af6e46d9c2
