const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const User = require('../models/User');

// GET /api/notifications
// Query: unread=true|false, limit, before (ISO)
exports.listNotifications = asyncHandler(async (req, res) => {
  const { unread, limit = 20, before } = req.query;
  const filter = { user: req.user._id };
  if (unread === 'true') filter.read = false;
  if (before) filter.createdAt = { $lt: new Date(before) };
  const items = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit) || 20, 100));
  res.json(items);
});

// POST /api/notifications/mark-read { ids: [] }
exports.markRead = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'ids must be a non-empty array' });
  }
  await Notification.updateMany(
    { _id: { $in: ids }, user: req.user._id, read: false },
    { $set: { read: true, readAt: new Date() } }
  );
  res.json({ success: true });
});

// POST /api/notifications/mark-all-read
exports.markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, read: false },
    { $set: { read: true, readAt: new Date() } }
  );
  res.json({ success: true });
});

// GET /api/notifications/prefs
exports.getPrefs = asyncHandler(async (req, res) => {
  const me = await User.findById(req.user._id).select('notificationPrefs');
  res.json(me.notificationPrefs || {});
});

// PUT /api/notifications/prefs
exports.updatePrefs = asyncHandler(async (req, res) => {
  const { category, inApp } = req.body;
  if (!category || typeof inApp !== 'boolean') {
    return res.status(400).json({ message: 'category and inApp(boolean) are required' });
  }
  const me = await User.findById(req.user._id);
  me.notificationPrefs = me.notificationPrefs || {};
  me.notificationPrefs[category] = { ...(me.notificationPrefs[category] || {}), inApp };
  await me.save();
  res.json(me.notificationPrefs);
});

// Helper to create a notification respecting prefs
exports.createNotification = async ({ userId, type, title, body, data = {} }) => {
  try {
    const user = await User.findById(userId).select('notificationPrefs');
    const keyMap = {
      chapter_release: 'chapterRelease',
      author_new_book: 'authorNewBook',
      book_updated: 'bookUpdated',
      review_reply: 'reviewReply',
      recommendation: 'recommendation',
      streak: 'streak',
      event: 'event',
      new_review: 'newReview',
      new_comment: 'newComment',
      publish_status: 'publishStatus',
      featured: 'featured',
      new_follower: 'newFollower',
      library_add: 'libraryAdd',
      system: 'system',
    };
    const prefKey = keyMap[type] || type;
    const enabled = user?.notificationPrefs?.[prefKey]?.inApp !== false; // default true
    if (!enabled) return null;
    const n = await Notification.create({ user: userId, type, title, body, data });
    return n;
  } catch (e) {
    // best-effort; do not throw to callers
    return null;
  }
};
