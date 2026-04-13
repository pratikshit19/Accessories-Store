import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://accessories-store-dzy4.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;