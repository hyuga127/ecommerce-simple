export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  // Product messages
  PRODUCT_CREATED: "Product created successfully",
  PRODUCTS_CREATED: "Products created successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCTS_FETCHED: "Products fetched successfully",

  // Category messages
  CATEGORY_CREATED: "Category created successfully",
  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORIES_FETCHED: "Categories fetched successfully",
  CATEGORY_UPDATED: "Category updated successfully",

  // User messages
  USER_CREATED: "User created successfully",
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",

  // General messages
  VALIDATION_ERROR: "Validation error",
  SERVER_ERROR: "Internal server error",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
};

export const VALIDATION_RULES = {
  PRODUCT: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    PRICE_MIN: 0,
    DESCRIPTION_MAX_LENGTH: 1000,
  },
  USER: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
  },
};
