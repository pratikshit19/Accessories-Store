import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";

const CATEGORIES = ["All", "Bracelets", "Necklaces", "Rings", "Earrings", "Watches"];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.products);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted mb-4">Collection</p>
          <h1 className="text-5xl font-light tracking-tight text-white">All Products</h1>
          <div className="h-[1px] w-16 bg-white/20 mt-6" />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-14">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-white text-white"
                    : "border-border-subtle text-text-muted hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <FiFilter className="text-text-muted" size={14} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-border-subtle text-text-muted text-xs tracking-widest px-3 py-2 focus:outline-none focus:border-white/30 transition-colors"
            >
              <option value="default" className="bg-[#0A0A0A]">Sort by: Default</option>
              <option value="price-asc" className="bg-[#0A0A0A]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#0A0A0A]">Price: High to Low</option>
              <option value="name" className="bg-[#0A0A0A]">Name: A–Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 animate-pulse">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-surface" />
                <div className="h-4 bg-surface w-2/3" />
                <div className="h-4 bg-surface w-1/4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-text-muted font-light">No products in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
