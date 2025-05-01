const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign up new user
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error('Error signing up user:', err);
    res.status(500).send('Server Error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    res.json(user);
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
