const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("./src/config/db");
const app = require("./src/app");
const paymentRoutes = require("./src/routes/paymentRoutes");

app.use("/api/payment", paymentRoutes);


if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/frontend/dist");

  app.use(express.static(distPath));

  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});