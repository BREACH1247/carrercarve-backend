// models/Choice.js
const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Choice', choiceSchema);