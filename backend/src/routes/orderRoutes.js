const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers')

router.post('/products/order', orderControllers.addOrder)

module.exports = router;
