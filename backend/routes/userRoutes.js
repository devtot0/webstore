import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

//route for user registration
router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

//POST request to user's login
router.post("/login", authUser);

//GET request to get user profile
//whenever we hit this route, the protect middeware runs
//POST request when the user profile is updated
router.route("/profile").get(getUserProfile).put(protect, updateUserProfile);

export default router;
