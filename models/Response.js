// models/Response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      selectedAnswers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Choice',
        required: true
      }]
    }
  ],
  score: {
    type: Number,
    required: true
  }
});

// Enforce that a user can only take a test once
responseSchema.index({ user: 1, test: 1 }, { unique: true });

module.exports = mongoose.model('Response', responseSchema);
