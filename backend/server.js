import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import userRouter from "./routes/userRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import { swaggerUiSetup, swaggerUiDocs } from "./config/swagger.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Swagger Documentation Route
app.use("/api-docs", swaggerUiSetup, swaggerUiDocs);
app.use(morgan("dev"));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
