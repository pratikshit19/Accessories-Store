const Product = require("../models/Product");
const productSchema = require("../validators/productValidator");


// const { error } = productSchema.validate(req.body);

// if (error) {
//   return res.status(400).json({ message: error.details[0].message });
// }

exports.getProducts = async (req, res) => {

  try {

    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i"
          }
        }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const count = await Product.countDocuments({
      ...keyword,
      ...category
    });

    const products = await Product.find({
      ...keyword,
      ...category
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize)
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.createProduct = async (req, res) => {
  try {

    const { name, description, price, category, stock } = req.body;

    const image = req.file ? req.file.path : "";

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message });

  }
};

exports.updateProduct = async (req, res) => {

  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  Object.assign(product, req.body);

  await product.save();

  res.json(product);

};
exports.deleteProduct = async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();

  res.json({ message: "Product deleted" });

};

exports.createReview = async (req, res) => {

  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const alreadyReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({ message: "Already reviewed" });
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ message: "Review added" });

};

exports.getProductById = async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);

};

exports.searchProducts = async (req, res) => {

  try {

    const { keyword } = req.query;

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" }
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Search failed"
    });

  }

};