"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const jwtUtils_1 = require("../utils/jwtUtils");
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
    try {
        // Validate request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const { username, email, password } = req.body;
        // Check if user already exists
        const userExists = await User_1.default.findOne({
            $or: [{ email }, { username }]
        });
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'User already exists'
            });
        }
        // Create new user
        const user = await User_1.default.create({
            username,
            email,
            password,
            settings: {
                theme: 'system',
                defaultView: 'list'
            }
        });
        if (user) {
            // Generate JWT token
            const token = (0, jwtUtils_1.generateToken)(user._id, user.username, user.email);
            res.status(201).json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    settings: user.settings,
                    token
                }
            });
        }
        else {
            res.status(400).json({
                success: false,
                error: 'Invalid user data'
            });
        }
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
};
exports.registerUser = registerUser;
/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    try {
        // Validate request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        // Generate JWT token
        const token = (0, jwtUtils_1.generateToken)(user._id, user.username, user.email);
        res.json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                settings: user.settings,
                token
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
};
exports.loginUser = loginUser;
/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getCurrentUser = async (req, res) => {
    try {
        // User is already attached to req by the auth middleware
        const user = req.user;
        res.json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                settings: user.settings
            }
        });
    }
    catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
};
exports.getCurrentUser = getCurrentUser;
/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */
const logoutUser = (req, res) => {
    try {
        // In a stateless JWT setup, logout is handled client-side by removing the token
        // This endpoint is mainly for consistency in the API
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=authController.js.map