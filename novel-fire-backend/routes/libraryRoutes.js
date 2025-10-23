const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateMiddleware');
const {
  addToLibrary,
  removeFromLibrary,
  updateProgress,
  getLibrary,
} = require('../controllers/libraryController');

router.post('/', protect, body('book').notEmpty(), validate, addToLibrary);
router.delete('/:bookId', protect, removeFromLibrary);
router.put('/progress', protect, body('book').notEmpty(), validate, updateProgress);
router.get('/', protect, getLibrary);

module.exports = router;
