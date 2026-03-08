require("dotenv").config();   // must be FIRST

const connectDB = require("./src/config/db");
const app = require("./src/app");
const paymentRoutes = require("./src/routes/paymentRoutes");

app.use("/api/payment", paymentRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});