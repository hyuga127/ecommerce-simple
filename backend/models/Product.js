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
  thumbnail: [
    {
      type: String,
      required: true,
    },
  ],
  discount: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
