import express from "express";

// POST /api/products → createProduct

// GET /api/products → getAllProducts

// GET /api/products/:id → getProductById

// PUT /api/products/:id → updateProduct

// DELETE /api/products/:id → deleteProduct

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
