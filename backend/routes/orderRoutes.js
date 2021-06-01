import express from "express";
const router = express.Router();
import {
  addOrderItems,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//route for user registration
router.route("/").post(protect, addOrderItems);

export default router;
