import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Kiểm tra xem header Authorization có tồn tại và bắt đầu bằng "Bearer" không vì token thường được gửi theo định dạng này
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ header
      token = req.headers.authorization.split(" ")[1];
      // Giải mã token để lấy thông tin người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Tìm người dùng trong cơ sở dữ liệu dựa trên ID từ token và loại bỏ trường mật khẩu
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});
