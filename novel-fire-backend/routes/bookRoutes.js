const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateMiddleware');
const upload = require('../utils/upload');

router.route('/')
	.get(getBooks)
	.post(
		protect,
		upload.single('cover'),
		body('title').notEmpty().withMessage('Title is required'),
		validate,
		createBook
	);

router.route('/:id')
	.get(getBookById)
	.put(protect, upload.single('cover'), body('title').optional().notEmpty(), validate, updateBook)
	.delete(protect, deleteBook);

module.exports = router;
