// controllers/userController.js

import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';

import Business from '../models/Business.js';
import Review from '../models/Review.js';

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

//update the password





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


//get all reviews by user
export const getUserReviews = asyncHandler(async (req, res) => {
  try {
    const ownerId = req.user._id;

    // 🔍 Step 1: Get all businesses created by this user
    const businesses = await Business.find({ owner: ownerId }).select('_id');

    if (!businesses.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'You have not listed any businesses yet.',
        data: [],
      });
    }

    const businessIds = businesses.map((b) => b._id);

    // 📥 Step 2: Fetch reviews for these business IDs
    const reviews = await Review.find({ business: { $in: businessIds } })
      .populate('user', 'fullName profile.avatar') // Reviewer info
      .populate('business', 'name')               // Business name
      .sort({ createdAt: -1 });

    // 🎁 Step 3: Format reviews neatly
    const formatted = reviews.map((r) => ({
      reviewerName: r.user?.fullName,
      reviewerAvatar: r.user?.profile?.avatar || null,
      businessName: r.business?.name,
      comment: r.comment,
      rating: r.rating,
      time: r.createdAt,
    }));

    return res.status(200).json({
      status: 'success',
      total: formatted.length,
      reviews: formatted,
    });

  } catch (error) {
    console.error('❌ Error while fetching user reviews:', error);

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching your business reviews.',
      error: error.message,
    });
  }
});

//get the business by use id
export const getUserBusinesses = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch businesses owned by this user
    const businesses = await Business.find({ owner: userId })
      .populate('owner', 'fullName profile.avatar') // Owner info
      .sort({ createdAt: -1 });

    if (!businesses.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'You have not listed any businesses yet.',
        data: [],
      });
    }

    return res.status(200).json({
      status: 'success',
      total: businesses.length,
      businesses,
    });

  } catch (error) {
    console.error('❌ Error while fetching user businesses:', error);

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching your businesses.',
      error: error.message,
    });
  }
});

//better error handling
export const handleError = (error, res) => {  
  console.error('❌ Error:', error.message || error);
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred. Please try again later.',
    error: error.message || 'Unknown error',
  });
}
