const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers')


router.get('/products', productControllers.getAllProducts)
router.get('/products/:id', productControllers.getProductById)
router.post('/products', productControllers.addProduct)
router.delete('/products/:id', productControllers.deleteProduct)
router.patch('/products/:id', productControllers.updateProduct)
router.get('/products/category/:category', productControllers.getAllByCategory)
router.get('/products/prices/minMax', productControllers.getMinMaxProductsPrice)
module.exports = router;
