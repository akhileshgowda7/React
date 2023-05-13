import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/user-controller.js ';
import protect from '../middleware/auth-middleware.js';
import { getUsers } from '../controllers/user-controller.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect,getUsers)
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
