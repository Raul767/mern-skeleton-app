import express  from "express";
import commentCtrl from '../controllers/comment.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/comments')
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