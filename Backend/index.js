import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import adminRoutes from './routes/adminRoute.js';
import { errorHandler } from './utils/errorHandler.js';
import businessRoutes from './routes/businessRoute.js';
import userRoutes from './routes/userRoute.js';
import superAdminRoute from './routes/superAdminRoute.js';
import plansRoute from './routes/plansRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import path from 'path';
import cors from "cors"
import eventRoutes from './routes/eventRoute.js';

dotenv.config();
const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if using cookies, sessions, etc.
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/user', userRoutes);
app.use('/api/superadmin', superAdminRoute);
app.use('/api/plan', plansRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/events', eventRoutes);

// ✅ Serve static files from 'uploads' folder
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});