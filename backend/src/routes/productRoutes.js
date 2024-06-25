const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers')

const keycloak = require("../middleware/keycloak")
const isAdmin = require("../utils/isAdmin")

router.get('/products', productControllers.getAllProducts)
router.get('/products/:id', productControllers.getProductById)
router.post('/products', [keycloak.protect(), isAdmin], productControllers.addProduct)
router.delete('/products/:id', [keycloak.protect(), isAdmin], productControllers.deleteProduct)
router.patch('/products/:id', [keycloak.protect(), isAdmin], productControllers.updateProduct)
router.get('/products/category/:category', productControllers.getAllByCategory)
router.get('/products/prices/minMax', productControllers.getMinMaxProductsPrice)

module.exports = router;
