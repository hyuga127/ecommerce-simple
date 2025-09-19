import { HTTP_STATUS, MESSAGES } from "../constants/index.js";
import productService from "../services/productService.js";
import { errorResponse, successResponse } from "../utils/response.js";

// @desc  Create a new product
// @route POST /api/products/create
// @access Private
export const createProduct = async (req, res) => {
  try {
    const product = await productService.insertOneProduct(req.body);
    if (product) {
      return successResponse(
        res,
        MESSAGES.PRODUCT_CREATED,
        product,
        HTTP_STATUS.CREATED
      );
    }
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Server Error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
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
    return successResponse(
      res,
      MESSAGES.PRODUCTS_FETCHED,
      products,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Server Error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      return successResponse(
        res,
        MESSAGES.PRODUCTS_FETCHED,
        product,
        HTTP_STATUS.OK
      );
    } else {
      return errorResponse(
        res,
        MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const products = await productService.searchByKeyword(keyword);
    return successResponse(
      res,
      MESSAGES.PRODUCTS_FETCHED,
      products,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Server Error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
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
        MESSAGES.PRODUCT_UPDATED,
        updatedProduct,
        HTTP_STATUS.OK
      );
    } else {
      return errorResponse(
        res,
        MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Server Error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
