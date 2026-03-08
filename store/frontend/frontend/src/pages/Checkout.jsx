import { useState } from "react";
import API from "../services/api";

export default function Checkout() {

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {

    const order = await API.post("/payment/create-order", {
      amount
    });

    const options = {

      key: "YOUR_RAZORPAY_KEY",

      amount: order.data.amount,

      currency: "INR",

      name: "Vearo Store",

      description: "Order Payment",

      order_id: order.data.id,

      handler: async function (response) {

        const verify = await API.post(
          "/payment/verify",
          response
        );

        if (verify.data.success) {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed");
        }

      },

      prefill: {
        name: "Customer",
        email: "customer@email.com"
      },

      theme: {
        color: "#000"
      }

    };

    const razor = new window.Razorpay(options);

    razor.open();

  };

  return (

    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Checkout
      </h1>

      <textarea
        placeholder="Shipping Address"
        className="w-full border p-3 mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        placeholder="Amount"
        className="border p-3 w-full mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handlePayment}
        className="bg-black text-white px-6 py-3"
      >
        Pay Now
      </button>

    </div>

  );

}