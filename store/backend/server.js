const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("./src/config/db");
const app = require("./src/app");
const paymentRoutes = require("./src/routes/paymentRoutes");

app.use("/api/payment", paymentRoutes);


if (process.env.NODE_ENV === "production") {
  // 1. Point to the correct nested 'dist' folder
  // __dirname is .../store/backend
  // .. goes to .../store
  const buildPath = path.join(__dirname, "../frontend/frontend/dist");
  
  app.use(express.static(buildPath));
  
  app.get("*", (req, res) => {
    // 2. Use the same buildPath variable to find index.html
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
}
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});