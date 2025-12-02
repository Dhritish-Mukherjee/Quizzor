const express = require('express');
const router = express.Router();
const { upload, pdfUploadMiddleware } = require('../middleware/multer');
const {
  getAllQuizzes,
  getQuiz,
  submitQuiz,
  getQuizHistory,
  getSubmission,
  createQuizFromPDF,
} = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllQuizzes);
router.get('/history', auth, getQuizHistory);
router.get('/submission/:id', auth, getSubmission);
router.get('/:id', auth, getQuiz);
router.post('/:id/submit', auth, submitQuiz);
router.post('/ai/upload', auth, upload.single('file'), pdfUploadMiddleware, createQuizFromPDF)

module.exports = router;