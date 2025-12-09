const express = require('express');
const router = express.Router();
const { upload, pdfUploadMiddleware } = require('../middleware/multer');
const {
  getAllQuizzes,
  getQuiz,
  submitQuiz,
  getQuizHistory,
  getSubmission,
  createQuizFromDocumentTurbo,
  createQuizFromDocumentSlow,
  createQuizWithoutDocument
} = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllQuizzes);
router.get('/history', auth, getQuizHistory);
router.get('/submission/:id', auth, getSubmission);
router.get('/:id', auth, getQuiz);
router.post('/:id/submit', auth, submitQuiz);
router.post('/ai/upload/slow', auth, upload.single('file'), pdfUploadMiddleware, createQuizFromDocumentSlow)
router.post('/ai/upload/turbo', auth, upload.single('file'), pdfUploadMiddleware, createQuizFromDocumentTurbo)
router.post('/ai/nofile', auth, createQuizWithoutDocument)

module.exports = router;