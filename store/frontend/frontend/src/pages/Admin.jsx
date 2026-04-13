import { useEffect, useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";

export default function Admin() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
    category: "",
  });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    if (!form.name || !form.price) return alert("Name and price are required");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchProducts();
      setForm({ name: "", price: "", image: null, description: "", category: "" });
      setShowForm(false);
    } catch (e) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const inputStyle = "w-full bg-background border border-border-subtle text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-light placeholder:text-text-muted/30";
  const labelStyle = "block text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium mb-2";

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-light tracking-[0.15em] text-white uppercase mb-2">Dashboard</h1>
            <div className="h-[1px] w-16 bg-white/20" />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            <FiPlus /> New Product
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border-subtle mb-12">
          {[
            { label: "Total Products", value: products.length },
            { label: "Active Listings", value: products.length },
            { label: "Avg. Price", value: products.length ? `₹${Math.round(products.reduce((a, p) => a + p.price, 0) / products.length)}` : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface px-8 py-6">
              <p className="text-[10px] text-text-muted tracking-widest uppercase mb-3 font-light">{label}</p>
              <p className="text-3xl font-light text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Add Product Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="glass-panel p-8 border border-white/10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xs tracking-[0.3em] text-white uppercase font-medium">Add New Product</h2>
                  <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-white transition-colors">
                    <FiX size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Product Name *</label>
                    <input name="name" placeholder="e.g. Leather Bracelet" className={inputStyle} onChange={handleChange} value={form.name} />
                  </div>
                  <div>
                    <label className={labelStyle}>Price (₹) *</label>
                    <input name="price" type="number" placeholder="999" className={inputStyle} onChange={handleChange} value={form.price} />
                  </div>
                  <div>
                    <label className={labelStyle}>Category</label>
                    <input name="category" placeholder="e.g. Bracelets" className={inputStyle} onChange={handleChange} value={form.category} />
                  </div>
                  <div>
                    <label className={labelStyle}>Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-text-muted text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-medium file:bg-white file:text-black hover:file:bg-gray-200 file:cursor-pointer"
                      onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelStyle}>Description</label>
                    <textarea name="description" rows={3} placeholder="Product description..." className={`${inputStyle} resize-none`} onChange={handleChange} value={form.description} />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    onClick={addProduct}
                    disabled={loading}
                    className="bg-white text-black px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product List */}
        <div>
          <p className="text-[10px] text-text-muted tracking-widest uppercase mb-6 font-light">All Products ({products.length})</p>
          <div className="border border-border-subtle divide-y divide-border-subtle">
            {products.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-6 p-5 hover:bg-white/2 transition-colors group"
              >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-surface">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-light tracking-wide truncate">{p.name}</h3>
                  <p className="text-text-muted text-xs mt-1 font-light">{p.category || "Uncategorized"}</p>
                </div>
                <p className="text-white font-light text-lg flex-shrink-0">₹{p.price}</p>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-2 flex-shrink-0"
                >
                  <FiTrash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}