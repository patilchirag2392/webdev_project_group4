const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Course = require('../models/Course');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { fullName, email, password, type } = req.body;
  try {
    if (!['instructor', 'user'].includes(type)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, type });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      role: user.type,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
