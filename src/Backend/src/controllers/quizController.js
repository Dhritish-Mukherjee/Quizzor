const Quiz = require('../models/Quiz');
const Submission = require('../models/Submission');
const User = require('../models/User');
const getRedisClient = require('../config/redis');
const {generateQuizFromDocument, generateQuizFromDocumentTurbo, generateQuizWithoutDocument} = require('../utils/AI');

// @desc    Get all quizzes
// @route   GET /api/quiz
// @access  Private
const getAllQuizzes = async (req, res, next) => {
  try {
    const { category, difficulty, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const quizzes = await Quiz.find(query)
      .select('-questions.correctAnswer -questions.explanation')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username');

    const count = await Quiz.countDocuments(query);

    res.status(200).json({
      success: true,
      data: quizzes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quiz
// @route   GET /api/quiz/:id
// @access  Private
const getQuiz = async (req, res, next) => {
  try {
    const redis = getRedisClient;
    const cacheKey = `quiz:${req.params.id}`;

    // Try to get from cache
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return res.status(200).json({
          success: true,
          data: JSON.parse(cached),
          cached: true
        });
      }
    } catch (redisError) {
      console.error('Redis get error:', redisError);
    }

    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (!quiz.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Quiz is not active'
      });
    }

    // Cache for 5 minutes
    try {
      await redis.setEx(cacheKey, 300, JSON.stringify(quiz));
    } catch (redisError) {
      console.error('Redis set error:', redisError);
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quiz/:id/submit
// @access  Private
const submitQuiz = async (req, res, next) => {
  try {
    const { answers, timeTaken } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers format'
      });
    }

    if (!timeTaken || timeTaken < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time taken'
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (!quiz.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Quiz is not active'
      });
    }

    // Evaluate answers
    let score = 0;
    let correctAnswers = 0;
    const evaluatedAnswers = [];

    answers.forEach((answer) => {
      const question = quiz.questions.id(answer.questionId);
      
      if (question) {
        const isCorrect = question.correctAnswer === answer.selectedAnswer;
        const points = isCorrect ? question.points : 0;

        evaluatedAnswers.push({
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          isCorrect,
          points
        });

        if (isCorrect) {
          score += points;
          correctAnswers++;
        }
      }
    });

    const accuracy = (correctAnswers / quiz.questions.length) * 100;

    // Create submission
    const submission = await Submission.create({
      user: req.user.id,
      quiz: quiz._id,
      answers: evaluatedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      accuracy,
      timeTaken
    });

    // Update user stats
    const user = await User.findById(req.user.id);
    await user.updateStats(correctAnswers, score, quiz.questions.length, timeTaken);

    // Update quiz stats
    quiz.attemptCount += 1;
    quiz.averageScore = ((quiz.averageScore * (quiz.attemptCount - 1)) + score) / quiz.attemptCount;
    await quiz.save();

    // Invalidate cache
    const redis = getRedisClient;
    try {
      await redis.del(`quiz:${quiz._id}`);
      await redis.del(`leaderboard:global`);
      await redis.del(`leaderboard:quiz:${quiz._id}`);
    } catch (redisError) {
      console.error('Redis delete error:', redisError);
    }

    res.status(201).json({
      success: true,
      data: {
        submission,
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        accuracy,
        timeTaken
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's quiz history
// @route   GET /api/quiz/history
// @access  Private
const getQuizHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const submissions = await Submission.find({ user: req.user.id })
      .populate('quiz', 'title category difficulty')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ completedAt: -1 });

    const count = await Submission.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: submissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get submission details
// @route   GET /api/quiz/submission/:id
// @access  Private
const getSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('quiz')
      .populate('user', 'username email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check if user owns this submission or is admin
    if (submission.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this submission'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Post file
// @route   POST /api/quiz/ai/upload/slow
// @access  Private

const createQuizFromDocumentSlow = async (req, res) => {
    try {
        
        const numberOfQuestions = parseInt(req.body.numberOfQuestions) || parseInt(req.query.numberOfQuestions) || 5;


        if (numberOfQuestions < 1 || numberOfQuestions > 50) {
            return res.status(400).json({
                success: false,
                error: 'Number of questions must be between 1 and 50.'
            });
        }

        const difficulty = req.body.difficulty || req.query.difficulty;
        if (!difficulty) {
            return res.status(400).json({
                success: false,
                error: 'Please select a difficulty level.'
            });
        }
        if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard' && difficulty !== 'god level hard') {
            return res.status(400).json({
                success: false,
                error: 'Please select a valid difficulty level.'
            });
        }

        const fileurl  = req.pdfData.filePath

        const quizData = await generateQuizFromDocument(fileurl, difficulty, numberOfQuestions);


        return res.status(200).json({
            success: true,
            data: quizData,
            fileInfo: {
                filename: req.pdfData.fileInfo?.originalname,
                size: req.pdfData.fileInfo?.size,
                fileUrl: req.pdfData.fileUrl
            }
        });

    } catch (error) {
        console.error('Controller error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to generate quiz from PDF.',
            message: error.message
        });
    }
};


// @desc    Post file
// @route   POST /api/quiz/ai/upload/turbo
// @access  Private
const createQuizFromDocumentTurbo = async (req, res) => {
    try {
        
        const numberOfQuestions = parseInt(req.body.numberOfQuestions) || parseInt(req.query.numberOfQuestions) || 5;


        if (numberOfQuestions < 1 || numberOfQuestions > 100) {
            return res.status(400).json({
                success: false,
                error: 'Number of questions must be between 1 and 100.'
            });
        }

        const difficulty = req.body.difficulty || req.query.difficulty;
        if (!difficulty) {
            return res.status(400).json({
                success: false,
                error: 'Please select a difficulty level.'
            });
        }

        const fileurl  = req.pdfData.filePath

        const quizData = await generateQuizFromDocumentTurbo(fileurl, difficulty, numberOfQuestions);


        return res.status(200).json({
            success: true,
            data: quizData,
            fileInfo: {
                filename: req.pdfData.fileInfo?.originalname,
                size: req.pdfData.fileInfo?.size,
                fileUrl: req.pdfData.fileUrl
            }
        });

    } catch (error) {
        console.error('Controller error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to generate quiz from PDF.',
            message: error.message
        });
    }
};

createQuizWithoutDocument = async (req, res) => {
  try{
      const numberOfQuestions = parseInt(req.body.numberOfQuestions) || 5;

      if (numberOfQuestions < 1 || numberOfQuestions > 50) {
        return res.status(400).json({
          success: false,
          error: 'Number of questions must be between 1 and 50.'
        });
      }

      const title = req.body.title || req.query.title;
      const description = req.body.description || req.query.description;
      const difficulty = req.body.difficulty || req.query.difficulty;

      if(!title  || !difficulty){
        return res.status(400).json({
          success: false,
          error: 'Please provide title and difficulty level.'
        });
      }

      const quizData = await generateQuizWithoutDocument(title, description, difficulty, numberOfQuestions);

        return res.status(200).json({
            success: true,
            data: quizData,
        });
    }
    catch (error) {
        console.error('Controller error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to generate quiz from Topic and Description',
            message: error.message
        });
    }
  
}

module.exports = {
  getAllQuizzes,
  getQuiz,
  submitQuiz,
  getQuizHistory,
  getSubmission,
  createQuizFromDocumentSlow,
  createQuizFromDocumentTurbo,
  createQuizWithoutDocument
};