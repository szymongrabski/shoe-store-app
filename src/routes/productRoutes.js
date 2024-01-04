const express = require('express');
const router = express.Router();
const neo4jDriver = require('../neo4jConfig');
const productControllers = require('../controllers/productControllers')


router.get('/products', productControllers.getAllProducts)
router.get('/products/:id', productControllers.getProductById)
router.post('/products', productControllers.addProduct)
router.delete('/products/:id', productControllers.deleteProduct)
router.patch('/products/:id', productControllers.updateProduct)

module.exports = router;
