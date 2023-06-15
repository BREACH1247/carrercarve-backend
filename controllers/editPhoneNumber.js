// routes/editPhoneNumber.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/', async (req, res) => {
  const { phone_number } = req.body;
  const userId = req.user.userId;

  try {
    // Update the user's phone number
    await User.findByIdAndUpdate(userId, { phone_number });

    res.status(200).json({
      success: true,
      message: 'Phone number changed/added successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating phone number'
    });
  }
});

module.exports = router;
