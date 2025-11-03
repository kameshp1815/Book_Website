import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import * as ctrl from '../controllers/commentController.js';

// List comments for a target
router.get('/', ctrl.list);

// Create comment (auth)
router.post('/', protect, ctrl.create);

// Delete comment (owner or admin)
router.delete('/:id', protect, ctrl.remove);

export default router;
