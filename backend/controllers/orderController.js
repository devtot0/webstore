import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//create new order
//POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    textPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      textPrice,
      shippingPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//get order by id
//GET api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await (await Order.findById(req.params.id)).populated("user", "name", "email");
  if(order) {
    res.json(order);
  } else {
    throw new Error("Order not found.");
  }
});
export { addOrderItems, getOrderById };
