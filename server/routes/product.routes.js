import express from 'express';
import productCtrl from '../controllers/product.controller';
import authCtrl from '../controllers/auth.controller';
import auth from '../../client/auth/auth-helper';

const router = express.Router();

router.route('/api/products')
    .get(productCtrl.list)
    .post(productCtrl.create);

router.route('/api/products/category')
    .put(authCtrl.requireSignin,
        productCtrl.addCategory)

router.route('/api/products/uncategory')
    .put(authCtrl.requireSignin,
        productCtrl.removeCategory)

router.route('/api/products/:productsId')
.get(authCtrl.requireSignin, productCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.remove);

export default router;