//Route/eventRoute.js
// routes/eventRoutes.js
import express from 'express';
import { createEvent, updateEvent, deleteEvent, getEventsByBusiness, approveEvent } from '../controllers/eventsController.js';
import upload from '../middlewares/upload.js';
import { protect } from '../middlewares/auth.js';
import roles from '../middlewares/roles.js';

const router = express.Router();

// Single file upload for bannerImage
const bannerUpload = upload.single('eventImages');

// 👤 Customer or Business
router.post('/', protect, bannerUpload, createEvent);
router.put('/:id', protect, bannerUpload, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.get('/event/:businessId', getEventsByBusiness);

// 🔐 Superadmin approval route
router.patch('/approve/:id', protect, roles('superadmin'), approveEvent);

export default router;