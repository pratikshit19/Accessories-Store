import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid"; // npm install @heroicons/react

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.post("/cart/remove", { productId });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-10 text-center text-xl text-gray-500">
        Your cart is empty
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Cart
      </h1>

      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-600">₹{item.product.price}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.product._id)}
              className="p-2 rounded-full hover:bg-red-100 transition duration-200"
              title="Delete item"
            >
              <TrashIcon className="w-6 h-6 text-gray-600 hover:text-red-700" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
          Total: ₹{total}
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white px-8 py-3 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}