import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin";
import Search from "../pages/Search";
import Orders from "../pages/Orders";

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
      </Routes>


  );

}