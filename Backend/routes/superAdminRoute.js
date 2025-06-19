// routes/superAdminRoutes.js

import express from 'express';
import { getAllUsers } from '../controllers/SuperAdminController.js';
import { protect } from '../middlewares/auth.js';          // JWT verify
import  roles  from '../middlewares/roles.js';   // role guard

const router = express.Router();

// Only accessible to logged-in users with superadmin role
router.get('/users', protect, roles('superadmin'), getAllUsers);

export default router;
