const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

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

// Register endpoint
authRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  res.status(201).json({
    success: true,
    data: {
      id: '123456',
      username,
      email,
      settings: {
        theme: 'system',
        defaultView: 'list'
      },
      token: 'sample-jwt-token'
    }
  });
});

// Login endpoint
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({
    success: true,
    data: {
      id: '123456',
      username: 'testuser',
      email,
      settings: {
        theme: 'system',
        defaultView: 'list'
      },
      token: 'sample-jwt-token'
    }
  });
});

// Get current user endpoint
authRouter.get('/me', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: '123456',
      username: 'testuser',
      email: 'user@example.com',
      settings: {
        theme: 'system',
        defaultView: 'list'
      }
    }
  });
});

// Logout endpoint
authRouter.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Mount auth router
app.use('/api/auth', authRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; 