const validator = require('validator');

const validateEmail = (email) => {
  if (!email) {
    return { valid: false, message: 'Email is required' };
  }
  if (!validator.isEmail(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  return { valid: true };
};

const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

const validateUsername = (username) => {
  if (!username) {
    return { valid: false, message: 'Username is required' };
  }
  if (username.length < 3 || username.length > 30) {
    return { valid: false, message: 'Username must be between 3 and 30 characters' };
  }
  if (!validator.isAlphanumeric(username, 'en-US', { ignore: '_-' })) {
    return { valid: false, message: 'Username can only contain letters, numbers, hyphens and underscores' };
  }
  return { valid: true };
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return validator.escape(validator.trim(input));
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeInput
};