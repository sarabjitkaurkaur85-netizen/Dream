const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const { sendVerificationEmail } = require('../utils/mailer');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user & send verification email
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please add all fields' });
    }

    // Check if user exists (case-insensitive)
    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (unverified)
    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      isVerified: false,
    });

    if (user) {
      // Generate verification token and save
      const token = user.generateVerificationToken();
      await user.save();

      // Send verification email in the background (non-blocking)
      sendVerificationEmail(normalizedEmail, name, token)
        .then(() => {
          console.log(`[Register] Verification email sent to: ${normalizedEmail}`);
        })
        .catch((mailErr) => {
          console.error('[Register] Failed to send verification email:', mailErr.message);
        });

      res.status(201).json({
        message: 'Registration successful! Please check your email to verify your account.',
        email: normalizedEmail,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/auth/verify/:token
// @desc    Verify email with token
// @access  Public
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification link.' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    console.log(`[Verify] Email verified for: ${user.email}`);

    res.json({
      message: 'Email verified successfully! You can now log in.',
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Public
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Please provide your email' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'This email is already verified' });
    }

    // Generate new token
    const token = user.generateVerificationToken();
    await user.save();

    // Send verification email in the background (non-blocking)
    sendVerificationEmail(user.email, user.name, token)
      .then(() => {
        console.log(`[Resend] Verification email resent to: ${user.email}`);
      })
      .catch((mailErr) => {
        console.error('[Resend] Failed to send verification email:', mailErr.message);
      });

    res.json({ message: 'Verification email resent. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate a user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check for user email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.log(`[Login] No user found for email: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      console.log(`[Login] Unverified account: ${email}`);
      return res.status(403).json({
        error: 'Please verify your email before logging in.',
        unverified: true,
        email: user.email,
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(`[Login] Wrong password for email: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`[Login] Success for: ${email}`);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('[Login] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user data
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
