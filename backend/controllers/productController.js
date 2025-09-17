import productService from "../services/productService.js";
import { errorResponse, successResponse } from "../utils/response.js";
import Fuse from "fuse.js";

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

    const products = await productService.getAllProducts();

    if (keyword) {
      // Giải thích: Sử dụng Fuse.js để tìm kiếm sản phẩm theo từ khóa (keys) và độ chính xác (threshold)
      // keys: Các trường trong sản phẩm để tìm kiếm (ví dụ: name, description, brand)
      // threshold: Độ chính xác của kết quả tìm kiếm (giá trị từ 0 đến 1, càng thấp càng chính xác)
      const fuse = new Fuse(products, {
        keys: ["name", "description", "brand"],
        threshold: 0.4,
      });
      const results = fuse.search(keyword);
      const matchedProducts = results.map((result) => result.item);
      return successResponse(
        res,
        "Products fetched successfully",
        matchedProducts,
        200
      );
    } else {
      return successResponse(
        res,
        "Products fetched successfully",
        products,
        200
      );
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};
