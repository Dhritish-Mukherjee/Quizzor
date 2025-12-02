// routes for user Authentication

const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  getMe,
  refreshToken
} = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/me', auth, getMe);
router.post('/refresh', refreshToken);

module.exports = router;