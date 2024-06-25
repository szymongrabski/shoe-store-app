const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const keycloak = require("../middleware/keycloak")

router.post('/products/order', keycloak.protect(), orderControllers.addOrder);

module.exports = router;
