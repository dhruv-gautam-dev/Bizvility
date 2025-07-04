import Notification from '../models/Notification.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const { _id: userId, role: userRole } = req.user;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const unreadOnly = req.query.unreadOnly === 'true';

  try {
    // 📌 Build filter
    const filter = {
      $or: [
        { user: userId },
        { role: userRole }
      ]
    };

    if (unreadOnly) {
      filter.isRead = false;
    }

    // ⚡ Fetch notifications
    const allNotifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🧠 Deduplicate by title + message + type
    const uniqueNotifications = [];
    const seen = new Set();

    for (const notif of allNotifications) {
      const key = `${notif.title}-${notif.message}-${notif.type}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueNotifications.push(notif);
      }
    }

    // 📊 Total count (for pagination info)
    const total = await Notification.countDocuments(filter);

    res.status(200).json({
      message: 'Notifications fetched successfully',
      count: uniqueNotifications.length,
      total,
      page,
      limit,
      notifications: uniqueNotifications
    });

  } catch (error) {
    console.error('❌ Failed to fetch notifications:', error.message);
    res.status(500).json({
      message: 'Error fetching notifications',
      error: error.message
    });
  }
});



export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({ message: 'Notification marked as read' });
});