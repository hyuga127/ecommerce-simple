import express from "express";
import { validate } from "../middlewares/validate.js";
import { createProductSchema } from "../validators/productValidator.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  createProducts,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/create-product",
  protect,
  validate(createProductSchema),
  createProduct
);
router.post(
  "/create-multiple-products",
  protect,
  validate(createProductSchema),
  createProducts
);
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
// router.delete("/:id", protect, deleteProduct);

export default router;
