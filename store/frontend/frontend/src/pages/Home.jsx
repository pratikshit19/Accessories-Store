import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <div
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://vearoindia.com/cdn/shop/files/4_682ce7f9-bbfd-434b-90e0-1df3fa00d37b.png?v=1770188046&width=713')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="text-center relative px-4 sm:px-6">
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            New Collection
          </h1>
          <p className="text-lg mb-6 text-white drop-shadow-md">
            Discover premium fashion
          </p>
          <a
            href="#products"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" className="px-4 sm:px-6 lg:px-10 py-12">
        <h2 className=" text-white text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}