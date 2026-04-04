import express from 'express';
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from '../controllers/record.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();



router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  createRecord
);



router.get(
  '/',
  authMiddleware,
  roleMiddleware('analyst', 'admin'),
  getRecords
);


router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  updateRecord
);


router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteRecord
);


export default router;