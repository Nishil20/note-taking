"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokenFromHeader = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
/**
 * Generate JWT token for a user
 * @param userId - MongoDB user ID
 * @param username - User's username
 * @param email - User's email
 * @returns JWT token
 */
const generateToken = (userId, username, email) => {
    const payload = {
        id: userId.toString(),
        username,
        email
    };
    // Using jwt.sign with the correct type for secret
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};
exports.generateToken = generateToken;
/**
 * Verify and decode JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
/**
 * Extract token from request headers
 * @param authHeader - Authorization header value
 * @returns Token string or null if not found or invalid format
 */
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};
exports.extractTokenFromHeader = extractTokenFromHeader;
//# sourceMappingURL=jwtUtils.js.map