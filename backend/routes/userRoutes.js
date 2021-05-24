import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//POST request to user's login
router.post('/login', authUser);
//GET request to get user profile
//whenever we hit this route, the protect middeware runs
router.route('/profile').get(getUserProfile);


export default router;
