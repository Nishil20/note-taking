"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const routeHelpers_1 = require("../utils/routeHelpers");
const router = express_1.default.Router();
// Registration validation rules
const registerValidation = [
    (0, express_validator_1.body)('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isLength({ max: 30 }).withMessage('Username cannot exceed 30 characters'),
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
// Login validation rules
const loginValidation = [
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, (0, routeHelpers_1.wrapAsync)(authController_1.registerUser));
// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', loginValidation, (0, routeHelpers_1.wrapAsync)(authController_1.loginUser));
// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authMiddleware_1.protect, (0, routeHelpers_1.wrapAsync)(authController_1.getCurrentUser));
// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post('/logout', (0, routeHelpers_1.wrapAsync)(authController_1.logoutUser));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map