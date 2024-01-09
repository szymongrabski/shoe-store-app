const express = require('express');
const router = express.Router();
const sizesControllers = require('../controllers/sizesControllers')

router.get('/products/:id/sizes', sizesControllers.getSizes)

module.exports = router;
