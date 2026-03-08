const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const router = express.Router();
const { admin } = require("../middleware/adminMiddleware");
const { protect } = require("../middleware/authMiddleware");
exports.createOrder = async (req, res) => {

  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart empty" });
  }

  const totalAmount = cart.items.reduce(
    (acc, item) => acc + item.quantity * 100,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    products: cart.items,
    totalAmount,
    shippingAddress
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);

};

exports.getAllOrders = async (req, res) => {

  const orders = await Order.find()
    .populate("user", "name email");

  res.json(orders);

};

router.get("/admin", protect, admin, exports.getAllOrders);

exports.getMyOrders = async (req, res) => {

  const orders = await Order.find({ user: req.user._id }).populate(
    "products.product"
  );

  res.json(orders);

};