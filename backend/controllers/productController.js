import productService from "../services/productService.js";
import { errorResponse, successResponse } from "../utils/response.js";

// @desc  Create a new product
// @route POST /api/products
// @access Private/thumbnailn
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    if (product) {
      return successResponse(res, "Product created successfully", product, 201);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return successResponse(res, "Products fetched successfully", products, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};
