import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Vearo</h3>
          <p>Premium fashion store delivering quality products.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-indigo-500 transition">Shop</Link>
            <Link to="/orders" className="hover:text-indigo-500 transition">Orders</Link>
            <Link to="/contact" className="hover:text-indigo-500 transition">Contact</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Newsletter</h3>
          <input
            placeholder="Your email"
            className="p-2 w-full rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <p className="text-center mt-10 text-sm text-gray-400">
        © 2026 Vearo Store. All rights reserved.
      </p>
    </footer>
  );
}