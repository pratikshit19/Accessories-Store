import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef();
  const [openSearch, setOpenSearch] = useState(false);

  const navStyle = ({ isActive }) =>
  `pb-1 border-b transition-all duration-200 ${
    isActive
      ? "border-white"
      : "border-transparent hover:border-white hover:text-gray-300"
  }`;


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="text-white top-0 z-50 border-b border-be-neutral-800">

      <div className="flex items-center justify-between px-6 md:px-12 py-10">

        {/* Logo */}
        <Link to="/" className="text-3xl tracking-widest font-light">
          VEARO
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex gap-10 text-sm tracking-wide">
          <NavLink to="/" className={navStyle}>Home</NavLink>
          <NavLink to="/catalog" className={navStyle}>Catalog</NavLink>
          <NavLink to="/about" className={navStyle}>About</NavLink>
          <NavLink to="/faq" className={navStyle}>FAQ</NavLink>
          <NavLink to="/contact" className={navStyle}>Contact</NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {openSearch && (
    <div className="hidden md:block w-54 mr-25">
      <SearchBar />
    </div>
  )}

          <FiSearch className="text-xl cursor-pointer" onClick={() => setOpenSearch(!openSearch)} />

          {!user ? (
            <Link to="/login">
              <FiUser className="text-xl cursor-pointer" />
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpenDropdown(!openDropdown)}>
                <FiUser className="text-xl cursor-pointer" />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg">
                  <div className="flex flex-col">
                    <span className="px-4 py-2 font-medium">
                      Hello, {user.name}
                    </span>

                    <Link to="/orders" className="px-4 py-2 hover:bg-gray-100">
                      Orders
                    </Link>

                    <Link to="/profile" className="px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>

                    {user.role === "admin" && (
                      <Link to="/admin" className="px-4 py-2 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <FiHeart className="text-xl cursor-pointer" />

          <Link to="/cart">
            <FiShoppingBag className="text-xl cursor-pointer" />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-3">
          

          <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/catalog" onClick={() => setMobileMenu(false)}>Catalog</Link>
          <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
          <Link to="/faq" onClick={() => setMobileMenu(false)}>FAQ</Link>
          <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
        </div>
      )}
    {openSearch && (
      <div className="md:hidden px-6 pb-4">
        <SearchBar />
      </div>
)}
    </nav>
    
  );
}
