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
  const order = await Order.findById(req.params.id).populate("user", "name", "email");
  if(order) {
    res.json(order);
  } else {
    throw new Error("Order not found.");
  }
});


//update order for payment
//GET api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now;
    order.paymentResult = {
      id: req.body.id, 
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    throw new Error("Order not found.");
  }
});


//get logged in user orders
//GET api/orders/myorders - limited to logged in users
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.json(orders)
  
});

//   Get all orders 
// GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders };

