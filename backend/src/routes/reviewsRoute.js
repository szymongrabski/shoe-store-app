const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviewsControllers')


router.get('/products/:id/reviews', reviewsControllers.getReviews)
router.post('/products/:id/reviews', reviewsControllers.addReview)
router.delete('/products/:productId/reviews/:reviewId', reviewsControllers.deleteReview)

module.exports = router;