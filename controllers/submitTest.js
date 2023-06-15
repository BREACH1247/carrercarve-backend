// routes/submitTest.js
const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Test = require('../models/Test');
const Question = require('../models/Question');
const Choice = require('../models/Choice');

router.post('/', async (req, res) => {
    try {
      const { userId, testId, answers } = req.body;
  
      // Check if the user has already taken the test
      const existingResponse = await Response.findOne({ user: userId, test: testId });
      if (existingResponse) {
        return res.status(400).json({ success: false, message: 'You have already taken this test' });
      }
  
      // Retrieve the test and questions from the database
      const test = await Test.findById(testId).populate('questions');
      if (!test) {
        return res.status(404).json({ success: false, message: 'Test not found' });
      }
  
      // Calculate the score based on user responses
      let score = 0;
      for (const answer of answers) {
        const { questionId, selectedAnswers } = answer;
        const question = await Question.findById(questionId);
        if (!question) {
          continue; // Skip this question if not found
        }
        const correctChoices = question.choices.filter(choice => choice.isCorrect);
        const selectedChoices = await Choice.find({ _id: { $in: selectedAnswers } });
        const isCorrect = correctChoices.every(correctChoice => selectedChoices.some(selectedChoice => selectedChoice.id === correctChoice.id));
        if (isCorrect) {
          score++;
        }
      }
  
      // Save the response to the database
      const response = new Response({
        user: userId,
        test: testId,
        answers,
        score
      });
      await response.save();
  
      // Return the response with the calculated score
      res.status(200).json({ success: true, message: 'Test submitted successfully', score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
