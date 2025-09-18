import express from "express";
import { validate } from "../middlewares/validate.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { createCategorySchema } from "../validators/categoryValidator.js";

const router = express.Router();

router.post(
  "/create-category",
  protect,
  validate(createCategorySchema),
  createCategory
);
router.get("/", getAllCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
