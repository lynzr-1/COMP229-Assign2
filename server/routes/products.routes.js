import express from 'express'
import productCtrl from '../controllers/products.controller.js' 

const router = express.Router()

router.route('/api/products')
  .get(productCtrl.list)
  .post(productCtrl.create)
  .delete(productCtrl.deleteAll);

router.route('/api/products/find').get(productCtrl.findProduct);

router.param('productId', productCtrl.productByID);

router.route('/api/products/:productId')
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(productCtrl.remove);

export default router