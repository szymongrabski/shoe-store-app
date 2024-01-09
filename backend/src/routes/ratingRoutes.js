const express = require('express');
const router = express.Router();
const ratingControllers = require('../controllers/ratingControllers')

router.get('/products/:id/rating', ratingControllers.getRating)

module.exports = router;
