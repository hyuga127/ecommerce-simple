import { errorResponse, successResponse } from "../utils/response.js";
import categoryService from "../services/categoryService.js";

// @desc  Create a new category
// @route POST /api/categories/create-category
// @access Private

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    if (category) {
      return successResponse(
        res,
        "Category created successfully",
        category,
        201
      );
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

// @desc  Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(
      res,
      "Categories fetched successfully",
      categories,
      200
    );
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

// @desc  Update a category
// @route PUT /api/categories/:id
// @access Private
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (category) {
      return successResponse(
        res,
        "Category updated successfully",
        category,
        200
      );
    } else {
      return errorResponse(res, "Category not found", 404);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};

// @desc  Delete a category
// @route DELETE /api/categories/:id
// @access Private
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (category) {
      return successResponse(res, "Category deleted successfully", null, 200);
    } else {
      return errorResponse(res, "Category not found", 404);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Server Error", 500);
  }
};
