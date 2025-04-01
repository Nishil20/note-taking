import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Interface for token payload
interface TokenPayload {
  id: string;
  username: string;
  email: string;
}

/**
 * Generate JWT token for a user
 * @param userId - MongoDB user ID
 * @param username - User's username
 * @param email - User's email
 * @returns JWT token
 */
export const generateToken = (
  userId: Types.ObjectId | string,
  username: string,
  email: string
): string => {
  const payload: TokenPayload = {
    id: userId.toString(),
    username,
    email
  };

  // Using jwt.sign with the correct type for secret
  return jwt.sign(
    payload, 
    JWT_SECRET as jwt.Secret, 
    { expiresIn: JWT_EXPIRE }
  );
};

/**
 * Verify and decode JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET as jwt.Secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from request headers
 * @param authHeader - Authorization header value
 * @returns Token string or null if not found or invalid format
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
}; 