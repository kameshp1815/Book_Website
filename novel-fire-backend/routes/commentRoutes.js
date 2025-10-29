const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/commentController');

// List comments for a target
router.get('/', ctrl.list);

// Create comment (auth)
router.post('/', protect, ctrl.create);

// Delete comment (owner or admin)
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
