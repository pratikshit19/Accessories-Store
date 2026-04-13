import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col bg-background">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/3 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.5em] text-text-muted mb-6"
          >
            Spring / Summer 2026
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-8"
          >
            Refined <span className="italic font-serif">Aesthetics</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-text-muted max-w-lg mx-auto mb-10 font-light leading-relaxed"
          >
            A curated selection of accessories designed for the modern individual. 
            Simplicity meets uncompromising quality.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#products"
              className="inline-block border border-white text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Collection
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-light tracking-tight text-white uppercase tracking-[0.2em]">Featured</h2>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>
          <p className="text-text-muted text-sm font-light">Showing {products.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))
          ) : (
            // Placeholder/Skeleton if no products
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[3/4] bg-surface" />
                <div className="h-4 bg-surface w-2/3" />
                <div className="h-4 bg-surface w-1/4" />
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-surface mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-white mb-8 tracking-wide italic font-serif">The Vearo Philosophy</h2>
          <p className="text-text-muted text-lg font-light leading-relaxed mb-12 capitalize">
            we believe that true luxury lies in the details. our pieces are more than just accessories; 
            they are a statement of intent, a commitment to enduring style.
          </p>
          <div className="flex justify-center gap-8 text-xs tracking-[0.4em] uppercase text-white font-medium">
            <span>Quality</span>
            <span className="text-white/20">•</span>
            <span>Design</span>
            <span className="text-white/20">•</span>
            <span>Ethics</span>
          </div>
        </div>
      </section>
    </div>
  );
}