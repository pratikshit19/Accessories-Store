import { useEffect, useState } from "react";
import API from "../services/api";

export default function Admin() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", form.image);

    await API.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Admin Dashboard
      </h1>

      {/* Add Product Form */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-10 space-y-4 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <input
          name="name"
          placeholder="Product Name"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          className="w-full"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <button
          onClick={addProduct}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-gray-700 font-medium">₹{p.price}</p>
              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}