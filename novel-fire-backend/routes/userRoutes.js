const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getDashboard,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Social graph
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);
router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);

// Dashboard stats for current user
router.get('/dashboard', protect, getDashboard);

module.exports = router;
