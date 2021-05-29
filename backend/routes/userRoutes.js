import express from "express";
const router = express.Router();
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//route for user registration
router.route('/').post(registerUser);

//POST request to user's login
router.post('/login', authUser);

//GET request to get user profile
//whenever we hit this route, the protect middeware runs
//POST request when the user profile is updated
router.route('/profile').get(getUserProfile).put(protect, updateUserProfile);



export default router;
