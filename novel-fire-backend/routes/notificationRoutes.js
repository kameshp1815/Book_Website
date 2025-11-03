import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import * as ctrl from '../controllers/notificationController.js';

router.get('/', protect, ctrl.listNotifications);
router.post('/mark-read', protect, ctrl.markRead);
router.post('/mark-all-read', protect, ctrl.markAllRead);
router.get('/prefs', protect, ctrl.getPrefs);
router.put('/prefs', protect, ctrl.updatePrefs);

export default router;
