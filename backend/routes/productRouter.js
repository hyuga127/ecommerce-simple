import express from "express";
import { validate } from "../middlewares/validate.js";
import { createProductSchema } from "../validators/productValidator.js";
import { protect } from "../middlewares/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/create", protect, validate(createProductSchema), createProduct);
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.put("/:id", protect, updateProduct);
// router.delete("/:id", protect, deleteProduct);

export default router;
