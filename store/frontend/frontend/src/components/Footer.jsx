import { Link, NavLink } from "react-router-dom";

export default function Footer() {
    const navStyle =
  "pb-1 border-b-2 border-transparent hover:border-white hover:text-gray-300 transition-all duration-200";


  return (
    <footer className="text-white py-10 font-light border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className=" mb-4 text-lg">Vearo</h3>
          <p>Premium fashion store delivering quality products.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-4 text-lg">Links</h3>
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={navStyle}>Shop</NavLink>
            <NavLink to="/orders" className="hover:text-indigo-500 transition">Orders</NavLink>
            <NavLink to="/contact" className="hover:text-indigo-500 transition">Contact</NavLink>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-lg">Newsletter</h3>
          <input
            placeholder="Your email"
            className="border border-neutral-700 p-2 w-full rounded text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <p className="text-center mt-10 text-sm text-gray-400">
        © 2026 Vearo Store. All rights reserved.
      </p>
    </footer>
  );
}