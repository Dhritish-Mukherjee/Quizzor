const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.length <= 6;
      },
      message: 'Must have between 2 and 6 options'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: 0
  },
  points: {
    type: Number,
    default: 1,
    min: 1
  },
  explanation: {
    type: String,
    default: ''
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Quiz description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 1,
    comment: 'Duration in minutes'
  },
  questions: {
    type: [questionSchema],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Quiz must have at least one question'
    }
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  attemptCount: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


quizSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    this.totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
  }
  next();
});

module.exports = mongoose.model('Quiz', quizSchema);