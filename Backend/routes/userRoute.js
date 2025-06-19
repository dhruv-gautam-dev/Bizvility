import express from 'express';
import upload from '../middlewares/upload.js';

import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// @route   GET /api/user/profile/:id
// @desc    Get user profile
// @access  Private
router.get('/profile/:id', protect, getUserProfile);

// @route   POST /api/user/profile/:id
// @desc    Update user profile
// @access  Private
router.put(
  '/profile/:id',
  protect,
  upload.single('userImage'), // ⬅️ This handles uploading the image
  updateUserProfile
);

export default router;
