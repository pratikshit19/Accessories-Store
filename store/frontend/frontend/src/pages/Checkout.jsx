import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { FiArrowLeft, FiLock } from "react-icons/fi";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCart();
  }, []);

  const total = cart?.items?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  ) || 0;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    if (!form.address || !form.name) {
      alert("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const order = await API.post("/payment/create-order", { amount: total });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "YOUR_RAZORPAY_KEY",
        amount: order.data.amount,
        currency: "INR",
        name: "Vearo",
        description: "Order Payment",
        order_id: order.data.id,
        handler: async function (response) {
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          const verify = await API.post("/payment/verify", {
            ...response,
            shippingAddress: `${form.address}, ${form.city} - ${form.pincode}`,
            userId: userData._id,
          });
          if (verify.data.success) {
            navigate("/orders");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#000000" },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-surface border border-border-subtle text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-light placeholder:text-text-muted/30";
  const labelStyle = "block text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium mb-2";

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-12 flex items-center gap-6">
          <button onClick={() => navigate("/cart")} className="text-text-muted hover:text-white transition-colors">
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-4xl font-light tracking-[0.15em] text-white uppercase">Checkout</h1>
            <div className="h-[1px] w-16 bg-white/20 mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xs tracking-[0.3em] text-text-muted uppercase mb-6 font-medium">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Full Name *</label>
                  <input name="name" placeholder="John Doe" className={inputStyle} value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className={labelStyle}>Email</label>
                  <input name="email" type="email" placeholder="you@example.com" className={inputStyle} value={form.email} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelStyle}>Phone</label>
                  <input name="phone" placeholder="+91 00000 00000" className={inputStyle} value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelStyle}>City</label>
                  <input name="city" placeholder="Mumbai" className={inputStyle} value={form.city} onChange={handleChange} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Address *</label>
                  <textarea name="address" rows={2} placeholder="Street, Building, Area" className={`${inputStyle} resize-none`} value={form.address} onChange={handleChange} required />
                </div>
                <div>
                  <label className={labelStyle}>Pincode</label>
                  <input name="pincode" placeholder="400001" className={inputStyle} value={form.pincode} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 space-y-6 sticky top-32">
              <h2 className="text-white font-light tracking-widest uppercase text-xs">Order Summary</h2>
              <div className="h-[1px] bg-white/10" />

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cart?.items?.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm text-text-muted">
                    <span className="truncate mr-4">{item.product.name} × {item.quantity}</span>
                    <span className="text-white flex-shrink-0">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="flex justify-between text-white">
                <span className="font-medium">Total</span>
                <span className="text-xl font-light">₹{total}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <FiLock size={14} />
                {loading ? "Processing..." : `Pay ₹${total}`}
              </motion.button>

              <p className="text-center text-[10px] text-text-muted/50 font-light">
                Secured by Razorpay · SSL Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}