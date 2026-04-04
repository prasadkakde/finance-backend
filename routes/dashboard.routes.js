import express from 'express';
import { getSummary } from '../controllers/dashboard.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/', authMiddleware, getSummary);

export default router;