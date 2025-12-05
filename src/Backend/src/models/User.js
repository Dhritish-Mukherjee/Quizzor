const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// defining userSchema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  totalScore: {
    type: Number,
    default: 0
  },
  totalQuizzes: {
    type: Number,
    default: 0
  },
  averageAccuracy: {
    type: Number,
    default: 0
  },
  refreshToken: {
    type: String,
    select: false
  }
}, {
  timestamps: true
});

// hashing the passwords before saving to DB
userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// creating a method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// creating another method to update the stats of the User
userSchema.methods.updateStats = async function(correctAnswers, score, totalQuestions, timeTaken) {
  this.totalScore += score;
  this.totalQuizzes += 1;
  
  const accuracy = (correctAnswers / totalQuestions) * 100;
  this.averageAccuracy = ((this.averageAccuracy * (this.totalQuizzes - 1)) + accuracy) / this.totalQuizzes;
  
  await this.save();
};

module.exports = mongoose.model('User', userSchema);