import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef();

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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Vearo Store
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          {!user ? (
            <Link
              to="/login"
              className="px-5 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition font-medium"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="px-5 py-2 border border-gray-300 rounded-full hover:bg-gray-100 flex items-center gap-2 transition font-medium"
              >
                Menu ▼
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="flex flex-col">
                    <span className="px-4 py-2 text-gray-700 font-medium">
                      Hello, {user.name}
                    </span>
                    <Link
                      to="/orders"
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/cart"
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Cart
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="px-4 py-2 hover:bg-gray-100 transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="px-4 py-2 text-red-500 text-left hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-2 border-t border-gray-200">
          <SearchBar />
          {!user ? (
            <Link
              to="/login"
              className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-100 transition font-medium"
              onClick={() => setMobileMenu(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <span className="px-4 py-2 text-gray-700 font-medium">
                Hello, {user.name}
              </span>
              <Link
                to="/orders"
                className="px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setMobileMenu(false)}
              >
                Orders
              </Link>
              <Link
                to="/cart"
                className="px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setMobileMenu(false)}
              >
                Cart
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setMobileMenu(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 text-red-500 text-left hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}