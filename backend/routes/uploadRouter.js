import express from "express";
import upload from "../config/multer.js";
import { errorResponse, successResponse } from "../utils/response.js";

const router = express.Router();

router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return errorResponse(res, "No file uploaded", 400);
  }

  // If file is uploaded successfully
  return successResponse(
    res,
    "File uploaded successfully",
    { url: req.file.path },
    200
  );
});

// Add error handling middleware
router.use((error, req, res) => {
  console.error("Upload error:", error);
  if (error.message && error.message.includes("api_key")) {
    return errorResponse(res, "Cloudinary configuration error", 500);
  }
  return errorResponse(res, error.message || "Upload failed", 500);
});

export default router;
