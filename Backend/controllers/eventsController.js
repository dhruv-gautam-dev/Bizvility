  //crete new file inside thecontroller/eventsControlle.js
// controllers/eventController.js
import Event from '../models/Events.js';
import Business from '../models/Business.js';
import asyncHandler from '../utils/asyncHandler.js';

// ✅ Create new event
export const createEvent = asyncHandler(async (req, res) => {
  const { business, title, description, startTime, endTime, link, location } = req.body;
  const bannerImage = req.file?.path;

  const businessExists = await Business.findById(business);
  if (!businessExists) {
    return res.status(404).json({ message: 'Business not found' });
  }

  const event = await Event.create({
    business,
    title,
    description,
    startTime,
    endTime,
    link,
    location,
    bannerImage,
    isApproved: false // Admin will approve later
  });

  res.status(201).json({
    message: 'Event created successfully',
    event
  });
});


export const getEventsByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Step 1: Find the business owned by this user
  const business = await Business.findOne({ owner: userId });

  if (!business) {
    return res.status(404).json({ message: 'No business found for this user' });
  }

  // Step 2: Fetch events for that business
  const events = await Event.find({ business: business._id }).sort({ date: 1 });

  res.status(200).json({
    message: 'Events fetched successfully',
    businessId: business._id,
    count: events.length,
    events
  });
});
//controller

// ✅ Edit event
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.file?.path) {
    updates.eventImages = req.file.path;
  }

  const updated = await Event.findByIdAndUpdate(id, updates, { new: true });

  if (!updated) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.status(200).json({
    message: 'Event updated successfully',
    event: updated
  });
});

// ✅ Delete event
export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.status(200).json({ message: 'Event deleted successfully' });
});

// ✅ Get events by business
export const getEventsByBusiness = asyncHandler(async (req, res) => {
  const { businessId } = req.params;

  const events = await Event.find({ business: businessId }).sort({ startTime: 1 });

  res.status(200).json({
    message: 'Events fetched successfully',
    events
  });
});

// ✅ Approve event (admin)
export const approveEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByIdAndUpdate(id, { isApproved: true }, { new: true });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.status(200).json({
    message: 'Event approved',
    event
  });
});