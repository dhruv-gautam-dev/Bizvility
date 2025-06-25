import express from 'express';
import { createBusiness, updateBusiness, getBusinessById, getAllBusinesses, getBusinessId } from '../controllers/businessController.js';
import upload from '../middlewares/upload.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Correct fields config (certificate is single)
const mediaFields = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'certificateImages', maxCount: 5 }, // ✅ fixed field name
  { name: 'galleryImages', maxCount: 10 }
]);

router.post('/business', protect, mediaFields, createBusiness);
router.put('/business/:id', protect, mediaFields, updateBusiness);
// router.get('/business/:id', protect, getBusinessById);
router.get('/businesses', getAllBusinesses)
router.get('/byid/:id', getBusinessId);

export default router;