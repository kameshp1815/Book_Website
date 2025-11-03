import express from 'express';
const router = express.Router();
import { getChaptersByBook, createChapter, updateChapter, deleteChapter } from '../controllers/chapterController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';

router.get('/book/:bookId', getChaptersByBook);
router.post('/', protect, body('title').notEmpty(), body('book').notEmpty(), validate, createChapter);
router.put('/:id', protect, body('title').optional().notEmpty(), validate, updateChapter);
router.delete('/:id', protect, deleteChapter);

export default router;
