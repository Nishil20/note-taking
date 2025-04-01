import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = 3001; // Using a different port

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Auth routes
const authRouter = express.Router();

// Simple register endpoint
authRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json({
    success: true,
    message: 'Registration endpoint working',
    data: { username, email }
  });
});

// Simple login endpoint
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({
    success: true,
    message: 'Login endpoint working',
    data: { email }
  });
});

// Mount auth router
app.use('/api/auth', authRouter);

// Start server
app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});

export default app; 