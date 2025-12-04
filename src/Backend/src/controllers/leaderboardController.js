const User = require('../models/User');
const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');
const getRedisClient = require('../config/redis');

// @desc    Get global leaderboard
// @route   GET /api/leaderboard/global
// @access  Public
const getGlobalLeaderboard = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const redis = getRedisClient;
    const cacheKey = `leaderboard:global:${page}:${limit}`;

    // Try cache first
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

    const users = await User.find()
      .select('username totalScore totalQuizzes averageAccuracy')
      .sort({ totalScore: -1, averageAccuracy: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments();

    const leaderboard = users.map((user, index) => ({
      rank: (page - 1) * limit + index + 1,
      username: user.username,
      totalScore: user.totalScore,
      totalQuizzes: user.totalQuizzes,
      averageAccuracy: parseFloat(user.averageAccuracy.toFixed(2))
    }));

    const result = {
      leaderboard,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    };

    // Cache for 2 minutes
    try {
      await redis.setEx(cacheKey, 120, JSON.stringify(result));
    } catch (redisError) {
      console.error('Redis set error:', redisError);
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get quiz-specific leaderboard
// @route   GET /api/leaderboard/quiz/:quizId
// @access  Public
const getQuizLeaderboard = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const { quizId } = req.params;

    const redis = getRedisClient;
    const cacheKey = `leaderboard:quiz:${quizId}:${page}:${limit}`;

    // Try cache first
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

    const quiz = await Quiz.findById(quizId).select('title category difficulty totalPoints');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Get best submission for each user
    const pipeline = [
      { $match: { quiz: quiz._id } },
      { $sort: { score: -1, timeTaken: 1 } },
      {
        $group: {
          _id: '$user',
          bestSubmission: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$bestSubmission' }
      },
      { $sort: { score: -1, timeTaken: 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit * 1 },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          username: '$userDetails.username',
          score: 1,
          accuracy: 1,
          timeTaken: 1,
          completedAt: 1
        }
      }
    ];

    const submissions = await Submission.aggregate(pipeline);

    const countPipeline = [
      { $match: { quiz: quiz._id } },
      { $group: { _id: '$user' } },
      { $count: 'total' }
    ];

    const countResult = await Submission.aggregate(countPipeline);
    const totalUsers = countResult.length > 0 ? countResult[0].total : 0;

    const leaderboard = submissions.map((sub, index) => ({
      rank: (page - 1) * limit + index + 1,
      username: sub.username,
      score: sub.score,
      accuracy: parseFloat(sub.accuracy.toFixed(2)),
      timeTaken: sub.timeTaken,
      completedAt: sub.completedAt
    }));

    const result = {
      quiz: {
        id: quiz._id,
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        totalPoints: quiz.totalPoints
      },
      leaderboard,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit)
      }
    };

    // Cache for 2 minutes
    try {
      await redis.setEx(cacheKey, 120, JSON.stringify(result));
    } catch (redisError) {
      console.error('Redis set error:', redisError);
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user rank in global leaderboard
// @route   GET /api/leaderboard/myrank/global
// @access  Private
const getMyGlobalRank = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const rank = await User.countDocuments({
      $or: [
        { totalScore: { $gt: user.totalScore } },
        {
          totalScore: user.totalScore,
          averageAccuracy: { $gt: user.averageAccuracy }
        }
      ]
    });

    res.status(200).json({
      success: true,
      data: {
        rank: rank + 1,
        username: user.username,
        totalScore: user.totalScore,
        totalQuizzes: user.totalQuizzes,
        averageAccuracy: parseFloat(user.averageAccuracy.toFixed(2))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user rank in quiz leaderboard
// @route   GET /api/leaderboard/myrank/quiz/:quizId
// @access  Private
const getMyQuizRank = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Get user's best submission
    const userSubmission = await Submission.findOne({
      user: req.user.id,
      quiz: quizId
    }).sort({ score: -1, timeTaken: 1 });

    if (!userSubmission) {
      return res.status(404).json({
        success: false,
        message: 'No submission found for this quiz'
      });
    }

    // Get better submissions count
    const pipeline = [
      { $match: { quiz: quiz._id } },
      { $sort: { score: -1, timeTaken: 1 } },
      {
        $group: {
          _id: '$user',
          bestScore: { $first: '$score' },
          bestTime: { $first: '$timeTaken' }
        }
      },
      {
        $match: {
          $or: [
            { bestScore: { $gt: userSubmission.score } },
            {
              bestScore: userSubmission.score,
              bestTime: { $lt: userSubmission.timeTaken }
            }
          ]
        }
      },
      { $count: 'betterSubmissions' }
    ];

    const rankResult = await Submission.aggregate(pipeline);
    const rank = rankResult.length > 0 ? rankResult[0].betterSubmissions + 1 : 1;

    res.status(200).json({
      success: true,
      data: {
        rank,
        quiz: {
          id: quiz._id,
          title: quiz.title
        },
        submission: {
          score: userSubmission.score,
          accuracy: parseFloat(userSubmission.accuracy.toFixed(2)),
          timeTaken: userSubmission.timeTaken,
          completedAt: userSubmission.completedAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGlobalLeaderboard,
  getQuizLeaderboard,
  getMyGlobalRank,
  getMyQuizRank
};