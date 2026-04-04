import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error('User not found or inactive');
    }

    
    req.user = user;

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized');
  }
};

export default authMiddleware;