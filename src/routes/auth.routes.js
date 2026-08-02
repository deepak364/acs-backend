const express = require('express');
const rateLimit = require('express-rate-limit');
const AuthController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validateRegister, validateLogin } = require('../middleware/validate.middleware');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: 'Too many login attempts. Please wait 15 minutes and try again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});


const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 5,
  message: {
    message: 'Too many accounts created from this IP. Please try again in an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});


const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: 'Too many requests. Please slow down and try again shortly.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});


router.post('/register', registerLimiter, validateRegister, AuthController.register);


router.post('/login', loginLimiter, validateLogin, AuthController.login);

router.get('/me', generalLimiter, authMiddleware, AuthController.getMe);

module.exports = router;
