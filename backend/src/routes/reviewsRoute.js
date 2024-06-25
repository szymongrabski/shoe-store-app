const express = require('express');
const router = express.Router();

const reviewsControllers = require('../controllers/reviewsControllers');
const keycloak = require("../middleware/keycloak");
const isAdmin = require("../utils/isAdmin")

router.get('/products/:id/reviews', reviewsControllers.getReviews);
router.post('/products/:id/reviews', reviewsControllers.addReview);
router.delete('/products/:productId/reviews/:reviewId', [keycloak.protect(), isAdmin], reviewsControllers.deleteReview);

module.exports = router;