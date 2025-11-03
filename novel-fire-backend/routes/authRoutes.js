import express from 'express';
const router = express.Router();
import { register, verifyOTP, resendOTP, login } from '../controllers/authController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';

// Debug: log incoming /api/auth requests
router.use((req, res, next) => {
  console.log('[Route] /noapi/auth', req.method, req.originalUrl);
  next();
});

router.post(
  '/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['reader','author']),
  validate,
  register
);
router.post('/verify-otp', body('userId').notEmpty(), body('otp').isLength({ min: 6, max: 6 }), validate, verifyOTP);
router.post('/resend-otp', body('userId').notEmpty(), validate, resendOTP);
router.post('/login', body('email').isEmail(), body('password').notEmpty(), validate, login);

export default router;
