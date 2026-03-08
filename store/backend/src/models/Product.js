const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  rating: Number,
  comment: String
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: String,

    price: {
      type: Number,
      required: true
    },

    image: {
        type:String,
    },

    category: {
      type: String
    },

    stock: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    },

    reviews: [reviewSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);