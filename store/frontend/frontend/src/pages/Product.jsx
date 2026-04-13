import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCheck } from "react-icons/fi";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post("/cart/add", { productId: product._id, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (error) {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 animate-pulse">
          <div className="aspect-[3/4] bg-surface" />
          <div className="space-y-6 pt-12">
            <div className="h-6 bg-surface w-1/3" />
            <div className="h-10 bg-surface w-2/3" />
            <div className="h-4 bg-surface w-1/4" />
            <div className="h-24 bg-surface w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-muted">
      Product not found
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] overflow-hidden bg-surface"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start pt-4 md:pt-16 space-y-8"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase mb-4">
                {product.category || "Essentials"}
              </p>
              <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-white">₹{product.price}</p>
            </div>

            <div className="h-[1px] bg-white/10" />

            <p className="text-text-muted font-light leading-relaxed">
              {product.description || "A thoughtfully crafted piece, made with care."}
            </p>

            <div className="space-y-4 pt-4">
              <motion.button
                onClick={addToCart}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-3 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {added ? (
                  <>
                    <FiCheck /> Added to Cart
                  </>
                ) : (
                  <>
                    <FiShoppingBag /> Add to Cart
                  </>
                )}
              </motion.button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full border border-white/20 text-text-muted py-4 text-xs tracking-widest uppercase hover:border-white/40 hover:text-white transition-all"
              >
                View Cart
              </button>
            </div>

            <div className="h-[1px] bg-white/10" />

            <div className="text-xs text-text-muted space-y-2 font-light">
              <p>✓ Free shipping on all orders</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Secure payment via Razorpay</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}