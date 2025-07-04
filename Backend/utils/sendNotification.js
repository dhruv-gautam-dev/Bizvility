

// utils/sendNotification.js

import Notification from '../models/Notification.js';
import User from '../models/user.js';

/**
 * 🔔 Send notification to a specific user
 */
export const notifyUser = async ({ userId, type, title, message, data = {} }) => {
  try {
    const user = await User.findById(userId).select('role');
    if (!user) {
      console.warn(`⚠️ User not found with ID: ${userId}`);
      return;
    }

    const notification = await Notification.create({
      user: userId,
      role: user.role,
      type,
      title,
      message,
      data
    });

    console.log(`🔔 Notification created for user [${userId}]`);
    return notification;

  } catch (error) {
    console.error('❌ notifyUser Error:', error.message);
  }
};

/**
 * 🔔 Send a single notification to all users with a specific role
 * (Stores one notification with role, not for each user)
 */
export const notifyRole = async ({ role, type, title, message, data = {} }) => {
  try {
    const existing = await Notification.findOne({ role, type, title, message });
    if (existing) {
      console.log(`🔁 Duplicate role notification already exists for ${role}`);
      return;
    }

    const notification = await Notification.create({
      user: null,
      role,
      type,
      title,
      message,
      data
    });

    console.log(`🔔 Role-based notification created for ${role}`);
    return notification;

  } catch (error) {
    console.error(`❌ notifyRole Error for ${role}:`, error.message);
  }
};