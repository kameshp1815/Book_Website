const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/notificationController');

router.get('/', protect, ctrl.listNotifications);
router.post('/mark-read', protect, ctrl.markRead);
router.post('/mark-all-read', protect, ctrl.markAllRead);
router.get('/prefs', protect, ctrl.getPrefs);
router.put('/prefs', protect, ctrl.updatePrefs);

module.exports = router;
