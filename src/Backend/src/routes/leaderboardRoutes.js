const express = require('express');
const router = express.Router();
const {
  getGlobalLeaderboard,
  getQuizLeaderboard,
  getMyGlobalRank,
  getMyQuizRank
} = require('../controllers/leaderboardController');
const auth = require('../middleware/auth');


router.get('/global', getGlobalLeaderboard);
router.get('/quiz/:quizId', getQuizLeaderboard);

// User-specific ranks (requires auth)
router.get('/myrank/global', auth, getMyGlobalRank);
router.get('/myrank/quiz/:quizId', auth, getMyQuizRank);

module.exports = router;