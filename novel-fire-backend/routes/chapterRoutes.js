const express = require('express');
const router = express.Router();
const { getChaptersByBook, createChapter, updateChapter, deleteChapter } = require('../controllers/chapterController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateMiddleware');

router.get('/book/:bookId', getChaptersByBook);
router.post('/', protect, body('title').notEmpty(), body('book').notEmpty(), validate, createChapter);
router.put('/:id', protect, body('title').optional().notEmpty(), validate, updateChapter);
router.delete('/:id', protect, deleteChapter);

module.exports = router;
