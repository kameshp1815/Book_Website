const express = require('express');
const router = express.Router();
const { register, verifyOTP, resendOTP, login } = require('../controllers/authController');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateMiddleware');

// Debug: log incoming /api/auth requests
router.use((req, res, next) => {
  console.log('[Route] /noapi/auth', req.method, req.originalUrl);
  next();
});

router.post('/register', body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }), validate, register);
router.post('/verify-otp', body('userId').notEmpty(), body('otp').isLength({ min: 6, max: 6 }), validate, verifyOTP);
router.post('/resend-otp', body('userId').notEmpty(), validate, resendOTP);
router.post('/login', body('email').isEmail(), body('password').notEmpty(), validate, login);

module.exports = router;
