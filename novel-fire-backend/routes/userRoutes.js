import express from 'express';
const router = express.Router();
import { 
  getProfile, 
  updateProfile,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getDashboard,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Social graph
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);
router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);

// Dashboard stats for current user
router.get('/dashboard', protect, getDashboard);

export default router;
