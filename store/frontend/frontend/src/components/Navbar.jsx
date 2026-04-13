import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef();
  const [openSearch, setOpenSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
    setOpenSearch(false);
    setOpenDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-header py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl tracking-[0.25em] font-light text-white z-50">
          VEARO
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex gap-10 text-sm tracking-widest text-text-muted">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative transition-colors duration-300 hover:text-white ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 text-white z-50">
          <button onClick={() => setOpenSearch(!openSearch)} className="hover:text-text-muted transition">
            <FiSearch className="text-xl" />
          </button>

          {!user ? (
            <Link to="/login" className="hover:text-text-muted transition">
              <FiUser className="text-xl" />
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setOpenDropdown(!openDropdown)}
                className="hover:text-text-muted transition flex items-center gap-2"
              >
                <FiUser className="text-xl" />
              </button>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-56 glass-panel rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/10 text-sm">
                      <p className="text-text-muted">Signed in as</p>
                      <p className="font-medium truncate">{user.name}</p>
                    </div>
                    <div className="py-2 flex flex-col text-sm">
                      <Link to="/orders" className="px-4 py-2 hover:bg-white/5 transition">Orders</Link>
                      {user.role === "admin" && (
                        <Link to="/admin" className="px-4 py-2 hover:bg-white/5 transition">Dashboard</Link>
                      )}
                      <button
                        onClick={logout}
                        className="px-4 py-2 text-left text-red-400 hover:bg-white/5 transition flex items-center gap-2"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link to="/cart" className="hover:text-text-muted transition relative">
            <FiShoppingBag className="text-xl" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden ml-2" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {openSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full glass-panel border-t border-white/5 absolute top-full left-0 origin-top overflow-hidden"
          >
            <div className="max-w-3xl mx-auto px-6 py-6">
              <SearchBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-panel border-t border-white/5 absolute top-full left-0 w-full h-screen flex flex-col px-6 pt-8 pb-32 gap-6 text-lg"
          >
            {navLinks.map((link, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={link.name}
              >
                <Link to={link.path} className="tracking-widest font-light hover:text-text-muted transition">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
