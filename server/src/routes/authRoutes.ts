import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  logoutUser 
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { wrapAsync } from '../utils/routeHelpers';

const router = express.Router();

// Registration validation rules
const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .isLength({ max: 30 }).withMessage('Username cannot exceed 30 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Login validation rules
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, wrapAsync(registerUser));

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', loginValidation, wrapAsync(loginUser));

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, wrapAsync(getCurrentUser));

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post('/logout', wrapAsync(logoutUser));

export default router; 