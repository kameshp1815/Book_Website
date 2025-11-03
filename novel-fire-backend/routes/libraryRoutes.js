import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';
import {
  addToLibrary,
  removeFromLibrary,
  updateProgress,
  getLibrary,
} from '../controllers/libraryController.js';

router.post('/', protect, body('book').notEmpty(), validate, addToLibrary);
router.delete('/:bookId', protect, removeFromLibrary);
router.put('/progress', protect, body('book').notEmpty(), validate, updateProgress);
router.get('/', protect, getLibrary);

export default router;
