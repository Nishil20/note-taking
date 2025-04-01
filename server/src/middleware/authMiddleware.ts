import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/jwtUtils';
import User from '../models/User';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Authentication middleware for protected routes
 * Verifies JWT token from authorization header
 */
export const protect: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, no token provided'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token failed'
      });
    }

    // Find user by id
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    // Add user object to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      error: 'Not authorized, authentication failed'
    });
  }
}; 