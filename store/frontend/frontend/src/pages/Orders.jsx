import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";

const STATUS_COLORS = {
  processing: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  delivered: "text-green-400 bg-green-400/10 border-green-400/20",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-[0.15em] text-white uppercase mb-2">My Orders</h1>
          <div className="h-[1px] w-16 bg-white/20" />
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse h-28 bg-surface border border-border-subtle" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <FiPackage className="mx-auto text-5xl text-text-muted/30" />
            <p className="text-text-muted font-light">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="border border-border-subtle p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[10px] text-text-muted/60 tracking-widest uppercase font-light">Order ID</p>
                    <p className="text-white text-sm font-mono tracking-wider">{order._id}</p>
                    <p className="text-text-muted text-xs mt-1 font-light">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span className={`px-3 py-1 text-xs border tracking-widest uppercase font-medium ${STATUS_COLORS[order.orderStatus] || STATUS_COLORS.processing}`}>
                      {order.orderStatus || "Processing"}
                    </span>
                    <p className="text-white text-lg font-light">₹{order.totalAmount}</p>
                    <p className={`text-xs font-light ${order.paymentStatus === "paid" ? "text-green-400" : "text-yellow-400"}`}>
                      Payment: {order.paymentStatus || "Pending"}
                    </p>
                  </div>
                </div>

                {order.shippingAddress && (
                  <div className="mt-4 pt-4 border-t border-border-subtle/50">
                    <p className="text-[10px] text-text-muted/60 tracking-widest uppercase mb-1 font-light">Shipping To</p>
                    <p className="text-text-muted text-sm font-light">{order.shippingAddress}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}