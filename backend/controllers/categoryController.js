import { errorResponse, successResponse } from "../utils/response.js";
import categoryService from "../services/categoryService.js";
import { HTTP_STATUS, MESSAGES } from "../constants/index.js";

// @desc  Create a new category
// @route POST /api/categories/create-category
// @access Private

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    if (category) {
      return successResponse(
        res,
        MESSAGES.CATEGORY_CREATED,
        category,
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

// @desc  Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(
      res,
      MESSAGES.CATEGORIES_FETCHED,
      categories,
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
        MESSAGES.CATEGORY_UPDATED,
        category,
        HTTP_STATUS.OK
      );
    } else {
      return errorResponse(
        res,
        MESSAGES.CATEGORY_NOT_FOUND,
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

// @desc  Delete a category
// @route DELETE /api/categories/:id
// @access Private
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (category) {
      return successResponse(res, "Category deleted successfully", null, 200);
    } else {
      return errorResponse(
        res,
        MESSAGES.CATEGORY_NOT_FOUND,
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
