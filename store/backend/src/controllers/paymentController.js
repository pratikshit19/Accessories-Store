const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: "Error creating Razorpay order"
    });

  }

};

exports.verifyPayment = async (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body =
    razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Create order in DB and clear cart
    try {
      const { shippingAddress, userId } = req.body;
      if (userId) {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (cart && cart.items.length > 0) {
          const totalAmount = cart.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity, 0
          );
          await Order.create({
            user: userId,
            products: cart.items,
            totalAmount,
            paymentStatus: "paid",
            orderStatus: "processing",
            shippingAddress: shippingAddress || ""
          });
          cart.items = [];
          await cart.save();
        }
      }
    } catch (dbErr) {
      console.error("Order creation after payment failed:", dbErr);
    }

    res.json({
      success: true,
      message: "Payment verified"
    });

  } else {

    res.status(400).json({
      success: false,
      message: "Payment verification failed"
    });

  }

};