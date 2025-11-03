import express from 'express';
const router = express.Router();
import { getReviewsByBook, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';

router.get('/book/:bookId', getReviewsByBook);
router.post('/', protect, body('rating').isInt({ min: 1, max: 5 }), body('book').notEmpty(), validate, createReview);
router.put('/:id', protect, body('rating').optional().isInt({ min: 1, max: 5 }), validate, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
