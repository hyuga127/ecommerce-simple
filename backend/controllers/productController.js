import productService from "../services/productService.js";
import { errorResponse, successResponse } from "../utils/response.js";

// @desc  Create a new product
// @route POST /api/products/create
// @access Private
export const createProduct = async (req, res) => {
  try {
    const product = await productService.insertOneProduct(req.body);
    if (product) {
      return successResponse(res, "Product created successfully", product, 201);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

// @desc  Create multiple products
// @route POST /api/products/create-multiple
// @access Private
export const createProducts = async (req, res) => {
  try {
    const products = await productService.insertMultiProducts(req.body);
    if (products) {
      return successResponse(
        res,
        "Products created successfully",
        products,
        201
      );
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

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      return successResponse(res, "Product fetched successfully", product, 200);
    } else {
      return errorResponse(res, "Product not found", 404);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const products = await productService.searchByKeyword(keyword);
    return successResponse(res, "Products fetched successfully", products, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    if (updatedProduct) {
      return successResponse(
        res,
        "Product updated successfully",
        updatedProduct,
        200
      );
    } else {
      return errorResponse(res, "Product not found", 404);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};
