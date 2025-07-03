import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendEmail from '../utils/emailSender.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Lead from '../models/Leads.js'; // Import Lead model

// Helper: Generate JWT
const generateToken = (id, expiresIn) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

// Helper: Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Register user with OTP
// @route   POST /api/auth/register
// export const register = asyncHandler(async (req, res) => {
//   const {
//     fullName,
//     username,
//     email,
//     password,
//     role = 'customer',
//     profile = {} // optional
//   } = req.body;

//   if (['admin', 'superadmin'].includes(role)) {
//     res.status(400);
//     throw new Error('Cannot register as admin');
//   }

//   // 🔍 Check if email already exists
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     if (existingUser.isVerified) {
//       res.status(400);
//       throw new Error('Email is already registered');
//     } else {
//       res.status(400);
//       throw new Error('You already registered. Please verify your email or request a new OTP');
//     }
//   }

//   // 🆕 Create new user
//   const otp = generateOTP();
//   const otpExpires = Date.now() + 10 * 60 * 1000;

//   const user = await User.create({
//     fullName,
//     username,
//     email,
//     password,
//     profile,
//     emailVerifyOTP: otp,
//     emailVerifyExpires: otpExpires
//   });

//   await sendEmail({
//     to: user.email,
//     subject: 'Email Verification OTP',
//     text: `Your OTP is: ${otp}`
//   });

//   const accessToken = generateToken(user._id, '15m');
//   const refreshToken = generateToken(user._id, '7d');

//   user.refreshTokens.push(refreshToken);
//   await user.save();

//   res.status(201).json({
//     accessToken,
//     refreshToken,
//     message: 'OTP sent to your email for verification'
//   });
// });
// ✅ ADD THIS FUNCTION
const generateReferralCode = () => {
  return 'SLS' + Math.floor(1000 + Math.random() * 9000);
};

// export const register = asyncHandler(async (req, res) => {
//   const {
//     fullName,
//     username,
//     email,
//     password,
//     role = 'customer',
//     profile = {}, // optional
//     referralCode // optional, only for customer registration
//   } = req.body;

//   if (['admin', 'superadmin'].includes(role)) {
//     res.status(400);
//     throw new Error('Cannot register as admin');
//   }

//   // 🔍 Check if email already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     if (existingUser.isVerified) {
//       res.status(400);
//       throw new Error('Email is already registered');
//     } else {
//       res.status(400);
//       throw new Error('You already registered. Please verify your email or request a new OTP');
//     }
//   }

//   // 🔐 Generate OTP for email verification
//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//   const otpExpires = Date.now() + 10 * 60 * 1000;

//   // 👤 If customer is referred, find the referrer
//   let referredBy = null;
//   if (referralCode && role === 'customer') {
//     const refUser = await User.findOne({ referralCode });
//     if (refUser) {
//       referredBy = refUser._id;
//     }
//   }

//   // 🔄 Auto-generate referralCode if role === sales
//   let generatedReferralCode = undefined;
//   if (role === 'sales') {
//     let unique = false;
//     while (!unique) {
//       const temp = generateReferralCode();
//       const existing = await User.findOne({ referralCode: temp });
//       if (!existing) {
//         generatedReferralCode = temp;
//         unique = true;
//       }
//     }
//   }

//   // 🆕 Create user
//   const user = await User.create({
//     fullName,
//     username,
//     email,
//     password,
//     role,
//     profile,
//     emailVerifyOTP: otp,
//     emailVerifyExpires: otpExpires,
//     referralCode: generatedReferralCode || undefined, // ✅ sales only
//     referredBy // ✅ if referred by someone
//   });

// // Auto-lead creation after signup
// await Lead.create({
//   name: user.fullName,
//   contact: user.email,
//   businessType: 'Unknown',
//   status: 'Interested',
//   notes: 'Signed up on website',
// });  

//   // Send email
//   await sendEmail({
//     to: user.email,
//     subject: 'Email Verification OTP',
//     text: `Your OTP is: ${otp}`
//   });

//   const accessToken = generateToken(user._id, '15m');
//   const refreshToken = generateToken(user._id, '7d');

//   user.refreshTokens.push(refreshToken);
//   await user.save();

//   res.status(201).json({
//     accessToken,
//     refreshToken,
//     message: 'OTP sent to your email for verification'
//   });
// });




// @desc    Verify Email using OTP
// @route   POST /api/auth/verify-email-otp

// export const register = asyncHandler(async (req, res) => {
//   const {
//     fullName,
//     username,
//     email,
//     password,
//     role = 'customer',
//     profile = {},
//     referralCode
//   } = req.body;

//   if (['admin', 'superadmin'].includes(role)) {
//     res.status(400);
//     throw new Error('Cannot register as admin');
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     if (existingUser.isVerified) {
//       res.status(400);
//       throw new Error('Email is already registered');
//     } else {
//       res.status(400);
//       throw new Error('You already registered. Please verify your email or request a new OTP');
//     }
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = Date.now() + 10 * 60 * 1000;

//   let referredBy = null;
//   let salesExecutive = null;

//   if (referralCode && role === 'customer') {
//     const refUser = await User.findOne({ referralCode });
//     if (refUser) {
//       referredBy = refUser._id;
//       salesExecutive = refUser._id;
//     }
//   }

//   // Auto-generate referral code for sales
//   let generatedReferralCode = undefined;
//   if (role === 'sales') {
//     let unique = false;
//     while (!unique) {
//       const temp = generateReferralCode();
//       const existing = await User.findOne({ referralCode: temp });
//       if (!existing) {
//         generatedReferralCode = temp;
//         unique = true;
//       }
//     }
//   }

//   const user = await User.create({
//     fullName,
//     username,
//     email,
//     password,
//     role,
//     profile,
//     emailVerifyOTP: otp,
//     emailVerifyExpires: otpExpires,
//     referralCode: generatedReferralCode,
//     referredBy
//   });

//   // 🧠 Round-robin fallback for sales assignment if no referral
//   if (!salesExecutive) {
//     const salesUsers = await User.find({ role: 'sales' });
//     if (salesUsers.length > 0) {
//       const index = Math.floor(Math.random() * salesUsers.length);
//       salesExecutive = salesUsers[index]._id;
//     }
//   }

//   // 📌 Auto-lead creation
//   await Lead.create({
//   name: user.fullName,
//   contact: user.email,
//   businessType: 'Unknown',
//   status: 'Interested',
//   notes: 'Signed up on website',
//   salesUser: salesExecutive || null,
//   followUpDate: new Date(Date.now() + 2 * 60 * 1000) // follow-up in 2 mins (for testing)
// });

//   await sendEmail({
//     to: user.email,
//     subject: 'Email Verification OTP',
//     text: `Your OTP is: ${otp}`
//   });

//   const accessToken = generateToken(user._id, '15m');
//   const refreshToken = generateToken(user._id, '7d');

//   user.refreshTokens.push(refreshToken);
//   await user.save();

//   res.status(201).json({
//     accessToken,
//     refreshToken,
//     message: 'OTP sent to your email for verification'
//   });
// });

export const register = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    role = 'customer',
    profile = {},
    referralCode
  } = req.body;

  // 🚫 Restrict admin/superadmin registration
  if (['admin', 'superadmin'].includes(role)) {
    res.status(400);
    throw new Error('Cannot register as admin');
  }

  // 🔍 Check if email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.isVerified) {
      res.status(400);
      throw new Error('Email is already registered');
    } else {
      res.status(400);
      throw new Error('You already registered. Please verify your email or request a new OTP');
    }
  }

  // 🔐 Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  let referredBy = null;
  let salesExecutive = null;

  // 🔁 Assign sales executive via referral
  if (referralCode && role === 'customer') {
    const refUser = await User.findOne({ referralCode });
    if (refUser) {
      referredBy = refUser._id;
      salesExecutive = refUser._id;
    }
  }

  // 🔁 Auto-generate referralCode for sales user
  let generatedReferralCode;
  if (role === 'sales') {
    let unique = false;
    while (!unique) {
      const temp = generateReferralCode();
      const exists = await User.findOne({ referralCode: temp });
      if (!exists) {
        generatedReferralCode = temp;
        unique = true;
      }
    }
  }

  // 👤 Create user
  const user = await User.create({
    fullName,
    username,
    email,
    password,
    role,
    profile,
    emailVerifyOTP: otp,
    emailVerifyExpires: otpExpires,
    referralCode: generatedReferralCode,
    referredBy
  });

  // 🔁 Round-robin fallback sales assignment (if no referral)
  if (!salesExecutive) {
    const salesUsers = await User.find({ role: 'sales' });
    if (salesUsers.length > 0) {
      const index = Math.floor(Math.random() * salesUsers.length);
      salesExecutive = salesUsers[index]._id;
    }
  }

  // 📌 Create a lead with follow-up reminder (for cron job)
  await Lead.create({
    name: user.fullName,
    contact: user.email,
    businessType: 'Unknown',
    status: 'Interested',
    notes: 'Signed up on website',
    salesUser: salesExecutive || null,
    followUpDate: new Date(Date.now() + 2 * 60 * 1000) // ⏰ 2 minutes from now
  });

  // 📧 Send OTP email
  await sendEmail({
    to: user.email,
    subject: 'Email Verification OTP',
    text: `Your OTP is: ${otp}`
  });

  // 🔐 Generate tokens
  const accessToken = generateToken(user._id, '15m');
  const refreshToken = generateToken(user._id, '7d');

  user.refreshTokens.push(refreshToken);
  await user.save();

  // ✅ Send response
  res.status(201).json({
    accessToken,
    refreshToken,
    message: 'OTP sent to your email for verification'
  });
});




export const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found');
  if (
    user.emailVerifyOTP !== otp ||
    !user.emailVerifyExpires ||
    user.emailVerifyExpires < Date.now()
  ) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  user.isVerified = true;
  user.emailVerifyOTP = undefined;
  user.emailVerifyExpires = undefined;
  await user.save();

  res.json({ message: 'Email verified successfully' });
});

// @desc    Login user
// @route   POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user)

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (!user.isVerified) {
    res.status(403);
    throw new Error('Please verify your email first');
  }

  const accessToken = generateToken(user._id, '30d');
  const refreshToken = generateToken(user._id, '7d');

  user.refreshTokens.push(refreshToken);
  await user.save();

  res.json({
    _id: user._id,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error('No refresh token provided');
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || !user.refreshTokens.includes(refreshToken)) {
    res.status(403);
    throw new Error('Invalid refresh token');
  }

  const newAccessToken = generateToken(user._id, '15m');
  res.json({ accessToken: newAccessToken });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// (Removed duplicate logout function)

// @desc    Forgot password - send OTP
// @route   POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const otp = generateOTP();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  user.resetPasswordOTP = otp;
  user.resetPasswordExpires = otpExpires;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: 'Forgot Password OTP',
    text: `Your OTP to reset password is: ${otp}`
  });

  // 🔐 Generate secure short-lived token
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

  res.json({
    message: 'OTP sent to your email for password reset',
    resetToken // 🚀 Send this to frontend
  });
});

// @desc    Verify OTP and reset password
// @route   POST /api/auth/verify-forgot-otp
// /api/auth/verify-forgot-otp
export const verifyForgotOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error('Email and OTP are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (
    user.resetPasswordOTP !== otp ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  // ✅ Mark OTP as verified (optional flag)
  user.isResetOTPVerified = true;
  await user.save();

  res.json({ message: 'OTP verified. You may now reset your password.' });
});


export const logout = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('No token found');
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Remove only the matching refresh token
  user.refreshTokens = user.refreshTokens.filter(rt => rt !== token);
  await user.save();

  res.json({ message: 'Logged out successfully' });
});

//resend otp
// @desc    Resend OTP to email (if not verified)
// @route   POST /api/auth/resend-otp
export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error('User already verified');
  }

  const otp = generateOTP();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  user.emailVerifyOTP = otp;
  user.emailVerifyExpires = otpExpires;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: 'Resend Email Verification OTP',
    text: `Your new OTP is: ${otp}`
  });

  res.json({ message: 'New OTP sent to your email' });
});


//forget
// export const verifyForgotOTP = asyncHandler(async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     res.status(400);
//     throw new Error('All fields (email, otp, newPassword) are required');
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   if (
//     user.resetPasswordOTP !== otp ||
//     !user.resetPasswordExpires ||
//     user.resetPasswordExpires < Date.now()
//   ) {
//     res.status(400);
//     throw new Error('Invalid or expired OTP');
//   }

//   user.password = newPassword;
//   user.resetPasswordOTP = undefined;
//   user.resetPasswordExpires = undefined;

//   await user.save();

//   res.json({ message: 'Password reset successful' });
// });
//password reset
// @desc    Update password after OTP verified
//reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  if (password.length < 12) {
    res.status(400);
    throw new Error('Password must be at least 12 characters long');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.password = password; // plain text (gets hashed by pre-save)
  user.markModified('password'); // 🔥 Force Mongoose to re-hash password

  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;
  user.isResetOTPVerified = undefined;

  await user.save();

  res.json({ message: 'Password has been updated successfully' });
});


