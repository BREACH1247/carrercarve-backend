// routes/signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    // Check if user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with the provided email'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone_number
    });

    // Save the user in the database
    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'Signed up successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during sign up'
    });
  }
});

module.exports = router;
