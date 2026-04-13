import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin";
import Search from "../pages/Search";
import Orders from "../pages/Orders";
import Catalog from "../pages/Catalog";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/search/:keyword" element={<Search />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}