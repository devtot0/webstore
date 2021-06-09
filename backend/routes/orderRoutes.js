import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
//controller is bind to the route

//route for user registration
router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrderById);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/myorders").get(protect, getMyOrders);

export default router;
