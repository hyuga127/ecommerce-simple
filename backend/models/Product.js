import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  thumbnail: {
    type: String,
    required: true,
  },
  variants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
