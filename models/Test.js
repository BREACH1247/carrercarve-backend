// models/Test.js
const mongoose = require('mongoose');
const Question = require('./Question');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    }
  ]
});

module.exports = mongoose.model('Test', testSchema);

