const razorpay = require("../config/razorpay");
const crypto = require("crypto");

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