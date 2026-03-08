import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1
      });
      alert("Added to cart");
    } catch (error) {
      alert("Login required");
    }
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="rounded-lg shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-start">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">₹{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <button
          onClick={addToCart}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition w-48"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}