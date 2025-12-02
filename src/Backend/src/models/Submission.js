const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  selectedAnswer: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  points: {
    type: Number,
    default: 0
  }
});

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [answerSchema],
  score: {
    type: Number,
    required: true,
    default: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true,
    default: 0
  },
  accuracy: {
    type: Number,
    required: true,
    default: 0
  },
  timeTaken: {
    type: Number,
    required: true,
    comment: 'Time taken in seconds'
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


submissionSchema.index({ quiz: 1, score: -1, timeTaken: 1 });
submissionSchema.index({ user: 1, quiz: 1, completedAt: -1 });

module.exports = mongoose.model('Submission', submissionSchema);