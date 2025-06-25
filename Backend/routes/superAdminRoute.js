
// routes/superAdminRoutes.js

import express from 'express';
import { getAllUsers, getAllBusinessListings, updateUserProfile, deleteBusinessListingById, addNewUser } from '../controllers/SuperAdminController.js';
import { protect } from '../middlewares/auth.js';          // JWT verify
import  roles  from '../middlewares/roles.js';   // role guard
import upload from '../middlewares/upload.js';

const router = express.Router();

// Only accessible to logged-in users with superadmin role
router.get('/users', protect, roles('superadmin'), getAllUsers);


// ✅ New route: Get all business listings
router.get('/businesses', protect, roles('superadmin'), getAllBusinessListings);
router.put('/updateUser/:id', protect, roles('superadmin'), updateUserProfile)
router.delete('/deleteUser/:id', protect, roles('superadmin'), deleteBusinessListingById);
router.post('/AddnewUser', protect, upload.single('userImage'), roles('superadmin'), addNewUser);

export default router;