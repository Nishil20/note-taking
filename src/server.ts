import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notetaker';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Server will continue without MongoDB. Some features may not work.');
    return false;
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// API Routes
app.use('/api/auth', authRoutes);
// Future routes
// app.use('/api/notes', noteRoutes);
// app.use('/api/tags', tagRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});

export default app; 