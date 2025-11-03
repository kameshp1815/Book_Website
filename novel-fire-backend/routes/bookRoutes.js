import express from 'express';
const router = express.Router();
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { protect, ensureRole } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';
import upload from '../utils/upload.js';

router.route('/')
	.get(getBooks)
	.post(
		protect,
		ensureRole('author'),
		upload.single('cover'),
		body('title').notEmpty().withMessage('Title is required'),
		body('tags').optional().custom((value) => {
		  // Accept either JSON string or array
		  let tags = value;
		  if (typeof value === 'string') {
		    try { tags = JSON.parse(value); } catch (e) { tags = [value]; }
		  }
		  if (!Array.isArray(tags)) {
		    throw new Error('tags must be an array');
		  }
		  if (tags.some(t => typeof t !== 'string' || t.length > 24)) {
		    throw new Error('Each tag must be a string up to 24 characters');
		  }
		  return true;
		}),
		validate,
		createBook
	);

router.route('/:id')
	.get(getBookById)
	.put(
		protect,
		ensureRole('author'),
		upload.single('cover'),
		body('title').optional().notEmpty().withMessage('Title cannot be empty'),
		body('tags').optional().custom((value) => {
		  let tags = value;
		  if (typeof value === 'string') {
		    try { tags = JSON.parse(value); } catch (e) { tags = [value]; }
		  }
		  if (!Array.isArray(tags)) {
		    throw new Error('tags must be an array');
		  }
		  if (tags.some(t => typeof t !== 'string' || t.length > 24)) {
		    throw new Error('Each tag must be a string up to 24 characters');
		  }
		  return true;
		}),
		validate,
		updateBook
	)
	.delete(protect, ensureRole('author'), deleteBook);

export default router;
