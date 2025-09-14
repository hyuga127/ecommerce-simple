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
