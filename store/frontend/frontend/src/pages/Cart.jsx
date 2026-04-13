import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiArrowRight, FiShoppingBag } from "react-icons/fi";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.post("/cart/remove", { productId });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const total = cart?.items?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  ) || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-2xl px-6">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse flex gap-6 p-4 border border-border-subtle">
              <div className="w-24 h-24 bg-surface" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-surface w-3/4" />
                <div className="h-4 bg-surface w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-8">
        <div className="text-center space-y-4">
          <FiShoppingBag className="mx-auto text-6xl text-text-muted/30" />
          <h2 className="text-2xl font-light text-white tracking-wide">Your cart is empty</h2>
          <p className="text-text-muted text-sm font-light">Add some pieces to get started</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="border border-white text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-[0.15em] text-white uppercase mb-2">Cart</h1>
          <div className="h-[1px] w-16 bg-white/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-px">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.product._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-6 p-6 border border-border-subtle hover:border-white/20 transition-colors group"
                >
                  <div className="w-20 h-20 overflow-hidden flex-shrink-0 bg-surface">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-light tracking-wide truncate">{item.product.name}</h3>
                    <p className="text-text-muted text-sm mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <p className="text-white font-medium">₹{item.product.price * item.quantity}</p>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-text-muted hover:text-red-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 space-y-6 sticky top-32">
              <h2 className="text-white font-light tracking-widest uppercase text-sm">Order Summary</h2>
              <div className="h-[1px] bg-white/10" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span className="text-white">₹{total}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span className="text-white">Free</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="flex justify-between text-white">
                <span className="font-medium">Total</span>
                <span className="text-xl font-light">₹{total}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group"
              >
                Proceed to Checkout
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full border border-white/20 text-text-muted py-3 text-xs tracking-widest uppercase hover:border-white/40 hover:text-white transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}