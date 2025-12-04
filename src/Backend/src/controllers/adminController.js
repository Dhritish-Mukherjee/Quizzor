const Quiz = require('../models/Quiz');
const User = require('../models/User');
const Submission = require('../models/Submission');
const { getRedisClient } = require('../config/redis');

// @desc    Create quiz
// @route   POST /api/admin/quiz
// @access  Private (Admin)
const createQuiz = async (req, res, next) => {
  try {
    const { title, description, category, difficulty, duration, questions } = req.body;

    if (!title || !description || !category || !duration || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate questions
    for (const question of questions) {
      if (!question.questionText || !question.options || question.options.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Each question must have text and at least 2 options'
        });
      }

      if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
        return res.status(400).json({
          success: false,
          message: 'Invalid correct answer index'
        });
      }
    }

    const quiz = await Quiz.create({
      title,
      description,
      category,
      difficulty: difficulty || 'medium',
      duration,
      questions,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quiz
// @route   PUT /api/admin/quiz/:id
// @access  Private (Admin)
const updateQuiz = async (req, res, next) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const { title, description, category, difficulty, duration, questions, isActive } = req.body;

    if (questions) {
      for (const question of questions) {
        if (!question.questionText || !question.options || question.options.length < 2) {
          return res.status(400).json({
            success: false,
            message: 'Each question must have text and at least 2 options'
          });
        }

        if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
          return res.status(400).json({
            success: false,
            message: 'Invalid correct answer index'
          });
        }
      }
    }

    quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, category, difficulty, duration, questions, isActive },
      { new: true, runValidators: true }
    );

    // Invalidate cache
    const redis = getRedisClient();
    try {
      await redis.del(`quiz:${quiz._id}`);
    } catch (redisError) {
      console.error('Redis delete error:', redisError);
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete quiz
// @route   DELETE /api/admin/quiz/:id
// @access  Private (Admin)
const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    await quiz.deleteOne();

    // Invalidate cache
    const redis = getRedisClient();
    try {
      await redis.del(`quiz:${quiz._id}`);
      await redis.del(`leaderboard:quiz:${quiz._id}`);
    } catch (redisError) {
      console.error('Redis delete error:', redisError);
    }

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;

    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password -refreshToken')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
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

// @desc    Get user analytics
// @route   GET /api/admin/analytics/user/:id
// @access  Private (Admin)
const getUserAnalytics = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const submissions = await Submission.find({ user: req.params.id })
      .populate('quiz', 'title category')
      .sort({ completedAt: -1 });

    const categoryPerformance = {};
    submissions.forEach((sub) => {
      const category = sub.quiz.category;
      if (!categoryPerformance[category]) {
        categoryPerformance[category] = {
          attempts: 0,
          totalScore: 0,
          averageAccuracy: 0
        };
      }
      categoryPerformance[category].attempts++;
      categoryPerformance[category].totalScore += sub.score;
      categoryPerformance[category].averageAccuracy += sub.accuracy;
    });

    Object.keys(categoryPerformance).forEach((category) => {
      const perf = categoryPerformance[category];
      perf.averageAccuracy = perf.averageAccuracy / perf.attempts;
      perf.averageScore = perf.totalScore / perf.attempts;
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          totalScore: user.totalScore,
          totalQuizzes: user.totalQuizzes,
          averageAccuracy: user.averageAccuracy
        },
        recentSubmissions: submissions.slice(0, 10),
        categoryPerformance
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get quiz analytics
// @route   GET /api/admin/analytics/quiz/:id
// @access  Private (Admin)
const getQuizAnalytics = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const submissions = await Submission.find({ quiz: req.params.id })
      .populate('user', 'username')
      .sort({ score: -1, timeTaken: 1 });

    const totalAttempts = submissions.length;
    const averageScore = submissions.reduce((sum, sub) => sum + sub.score, 0) / totalAttempts || 0;
    const averageAccuracy = submissions.reduce((sum, sub) => sum + sub.accuracy, 0) / totalAttempts || 0;
    const averageTime = submissions.reduce((sum, sub) => sum + sub.timeTaken, 0) / totalAttempts || 0;

    const scoreDistribution = {
      '0-25%': 0,
      '26-50%': 0,
      '51-75%': 0,
      '76-100%': 0
    };

    submissions.forEach((sub) => {
      const percentage = (sub.score / quiz.totalPoints) * 100;
      if (percentage <= 25) scoreDistribution['0-25%']++;
      else if (percentage <= 50) scoreDistribution['26-50%']++;
      else if (percentage <= 75) scoreDistribution['51-75%']++;
      else scoreDistribution['76-100%']++;
    });

    res.status(200).json({
      success: true,
      data: {
        quiz: {
          id: quiz._id,
          title: quiz.title,
          category: quiz.category,
          difficulty: quiz.difficulty,
          totalPoints: quiz.totalPoints,
          questionsCount: quiz.questions.length
        },
        stats: {
          totalAttempts,
          averageScore,
          averageAccuracy,
          averageTime,
          scoreDistribution
        },
        topSubmissions: submissions.slice(0, 10)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get overall analytics
// @route   GET /api/admin/analytics/overview
// @access  Private (Admin)
const getOverviewAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalSubmissions = await Submission.countDocuments();

    const activeUsers = await User.countDocuments({
      totalQuizzes: { $gt: 0 }
    });

    const recentSubmissions = await Submission.find()
      .populate('user', 'username')
      .populate('quiz', 'title')
      .sort({ completedAt: -1 })
      .limit(10);

    const popularQuizzes = await Quiz.find()
      .sort({ attemptCount: -1 })
      .limit(5)
      .select('title category attemptCount averageScore');

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalQuizzes,
          totalSubmissions,
          activeUsers
        },
        recentSubmissions,
        popularQuizzes
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllUsers,
  getUserAnalytics,
  getQuizAnalytics,
  getOverviewAnalytics
};