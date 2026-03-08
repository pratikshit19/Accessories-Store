import { applyVirtuals } from "../../../../backend/src/models/Cart";
import API from "./api";

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const getProduct = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (product) => {

  const res = await API.post("/products", product);

  return res.data;

};