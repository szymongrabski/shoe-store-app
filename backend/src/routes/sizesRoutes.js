const express = require('express');
const router = express.Router();
const sizesControllers = require('../controllers/sizesControllers')

router.get('/products/:id/sizes', sizesControllers.getSizes)
router.get('/products/:id/sizes/available', sizesControllers.getAvailableSizes)

module.exports = router;
