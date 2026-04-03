import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB (without password)
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error('User not found or inactive');
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized');
  }
};

export default authMiddleware;