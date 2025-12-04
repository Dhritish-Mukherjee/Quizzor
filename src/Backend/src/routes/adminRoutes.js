const express = require('express');
const router = express.Router();
const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllUsers,
  getUserAnalytics,
  getQuizAnalytics,
  getOverviewAnalytics
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// All admin routes require authentication and admin role
router.use(auth);
router.use(checkRole('admin'));

// Quiz management
router.post('/quiz', createQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);

// User management
router.get('/users', getAllUsers);

// Analytics
router.get('/analytics/overview', getOverviewAnalytics);
router.get('/analytics/user/:id', getUserAnalytics);
router.get('/analytics/quiz/:id', getQuizAnalytics);

module.exports = router;