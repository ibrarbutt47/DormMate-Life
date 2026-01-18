import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import adminRoutes from './routes/adminRoutes.js'; // ❗ NOT PRESENT

// Database connection
import db from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import roommateRoutes from './routes/roommateRoutes.js'; // ✅ NEW
import chatRoutes from './routes/chatRoutes.js';

// Initialize dotenv and express
dotenv.config();
const app = express();

// CORS setup
app.use(cors({
  // origin: 'http://localhost:3000', // Frontend origin
  origin: '*', // Frontend origin
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.use(cors({
//   origin: ['http://localhost:3000', 'http://192.168.215.46:5000', 'http://<your-flutter-web-ip>:<port>'],
//   credentials: true
// }));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
app.use('/api/admin', adminRoutes);                // ❗ NOT PRESENT

app.use('/uploads', express.static(uploadPath));
app.use('/uploads', express.static('uploads'));
app.use('/api/chat', chatRoutes);


// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/roommates', roommateRoutes); // ✅ NEW: Roommate AI Matching APIs
app.use('/api', protectedRoutes); // keep at bottom for catch-all protected routes
// Fallback for 404
app.use((req, res) => {
  res.status(404).json({ message: '🔍 Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
