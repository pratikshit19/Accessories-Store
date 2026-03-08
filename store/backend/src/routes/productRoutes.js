const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { createReview } = require("../controllers/productController");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { getProductById } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { searchProducts } = require("../controllers/productController");



router.get("/", getProducts);
router.get("/search/query", searchProducts);
router.post(
    "/", 
    protect, 
    admin, 
    upload.single("image"), 
    createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.post("/:id/reviews", protect, createReview);
// router.post(
//   "/upload",
//   protect,
//   admin,
//   upload.single("image"),
//   (req, res) => {
//     res.json({ imageUrl: req.file.path });
//   }
// );
router.get("/:id", getProductById);


module.exports = router;