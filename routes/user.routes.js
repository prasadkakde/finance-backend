import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);



router.get(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  getUsers
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  updateUser
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteUser
);


export default router;