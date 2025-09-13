import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import { errorResponse, successResponse } from "../utils/response.js";

// @desc  Create a new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  });

  const createdProduct = await product.save();

  successResponse(res, 201, "Product created successfully", createdProduct);
};
