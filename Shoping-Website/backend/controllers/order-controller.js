import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc Create new order
 * @route POST /api/order
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    try {
      const createdOrder = await order.save();
      console.log(order)
      res.status(201).json(createdOrder);
    } catch (error) {
      console.log('order not created');
      res.status(500).json({ error: 'Failed to create the order' });
    }
  }
});
/**
 * @desc get order by id
 * @route GET /api/order/:id
 * @access Private
 */

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

export { addOrderItems, getOrderById };
