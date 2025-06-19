// controllers/SuperAdminController.js

import business from '../models/Business.js';
import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendEmail from '../utils/emailSender.js';



// get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Access denied: SuperAdmin only.' });
  }

  const users = await User.find().select('-password -refreshTokens -emailVerifyOTP -resetPasswordOTP -emailVerifyExpires -resetPasswordExpires');

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

//update user by id
//create user we all done in userController.js file
// create business listing also done in businessListingController.js and edit as well.

