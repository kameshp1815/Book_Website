const express = require('express');
const router = express.Router();
const { getReviewsByBook, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateMiddleware');

router.get('/book/:bookId', getReviewsByBook);
router.post('/', protect, body('rating').isInt({ min: 1, max: 5 }), body('book').notEmpty(), validate, createReview);
router.put('/:id', protect, body('rating').optional().isInt({ min: 1, max: 5 }), validate, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
