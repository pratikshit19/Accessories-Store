import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Search() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/search/query?keyword=${keyword}`);
        setProducts(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted mb-3">Results for</p>
          <h1 className="text-4xl font-light tracking-tight text-white">"{keyword}"</h1>
          <div className="h-[1px] w-16 bg-white/20 mt-4" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 animate-pulse">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-surface" />
                <div className="h-4 bg-surface w-2/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-text-muted font-light">No products found for "{keyword}"</p>
          </div>
        ) : (
          <>
            <p className="text-text-muted text-sm font-light mb-12">{products.length} items found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}