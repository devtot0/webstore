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

  if(orderItems && orderItems.length === 0){
      res.status(400);
      throw new Error('No order items');
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

export { addOrderItems};