import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-4">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Quick View / Hover Action */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button className="w-full bg-white text-black py-3 text-sm font-medium tracking-wider uppercase">
              Quick View
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-light tracking-wide text-white group-hover:text-text-muted transition-colors">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-white">₹{product.price}</p>
          </div>
          <p className="text-xs text-text-muted tracking-widest uppercase font-light">
            {product.category || "Essentials"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}