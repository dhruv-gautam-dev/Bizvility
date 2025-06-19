// controllers/userController.js

import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get current user details
// @route   GET /api/user/profile/:id
// @access  Private
//get the user By Id
export const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password -refreshTokens');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

//edit the user

// @desc    Update user profile
// @route   POST /api/user/profile/:id
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const allowedFields = ['fullName', 'email', 'username', 'city', 'state', 'country', 'zipCode'];
  const updateData = {};

  for (let key of allowedFields) {
    if (req.body[key] !== undefined) {
      updateData[key] = req.body[key];
    }
  }

  // ✅ Handle nested profile fields
  updateData.profile = {
    name: req.body['profile.name'],
    phone: req.body['profile.phone'],
    avatar: req.file ? `/uploads/userImage/${req.file.filename}` : undefined
  };

  // Remove undefined fields from profile
  Object.keys(updateData.profile).forEach(
    (key) => updateData.profile[key] === undefined && delete updateData.profile[key]
  );

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select('-password -refreshTokens');

  if (!updatedUser) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: updatedUser,
  });
});



// User uploads their profile image
// router.post('/upload-profile', upload.single('profileImage'), async (req, res) => {
//   try {
//     const userId = req.user.id; // assuming auth middleware is used
//     const profileImage = req.file?.path;

//     if (!profileImage) {
//       return res.status(400).json({ error: 'No image uploaded' });
//     }

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { profileImage },
//       { new: true }
//     );

//     res.json({ message: 'Profile image updated', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });