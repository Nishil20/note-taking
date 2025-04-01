const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Auth router
const authRouter = express.Router();

// Register endpoint
authRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    data: { username, email }
  });
});

// Login endpoint
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: { email, token: 'sample-token-123456' }
  });
});

// Mount the auth router
app.use('/api/auth', authRouter);

// Start server
app.listen(port, () => {
  console.log(`Minimal server running on port ${port}`);
}); 