"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const User_1 = __importDefault(require("../models/User"));
/**
 * Authentication middleware for protected routes
 * Verifies JWT token from authorization header
 */
const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = (0, jwtUtils_1.extractTokenFromHeader)(req.headers.authorization);
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized, no token provided'
            });
        }
        // Verify token
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized, token failed'
            });
        }
        // Find user by id
        const user = await User_1.default.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }
        // Add user object to request
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            error: 'Not authorized, authentication failed'
        });
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map