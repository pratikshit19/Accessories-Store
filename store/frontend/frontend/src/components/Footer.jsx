import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const linkVariant = {
    hover: { x: 5, color: "#FFFFFF", transition: { duration: 0.2 } }
  };

  return (
    <footer className="bg-background border-t border-border-subtle pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl tracking-[0.2em] font-light text-white mb-6">VEARO</h3>
            <p className="text-text-muted max-w-sm leading-relaxed font-light">
              Elevating essentials through meticulous design and uncompromised quality.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide">Explore</h4>
            <div className="flex flex-col gap-4 text-text-muted font-light">
              <motion.div whileHover="hover" variants={linkVariant}><Link to="/">Home</Link></motion.div>
              <motion.div whileHover="hover" variants={linkVariant}><Link to="/catalog">Catalog</Link></motion.div>
              <motion.div whileHover="hover" variants={linkVariant}><Link to="/about">About Us</Link></motion.div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide">Newsletter</h4>
            <div className="flex bg-surface-light rounded-none p-1 border border-border-subtle focus-within:border-white/30 transition-colors">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none text-white px-4 py-2 w-full focus:outline-none font-light placeholder:text-text-muted/50"
              />
              <button className="bg-white text-black px-6 py-2 font-medium hover:bg-gray-200 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-muted/60 pt-8 border-t border-border-subtle/50">
          <p>© {new Date().getFullYear()} Vearo. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}