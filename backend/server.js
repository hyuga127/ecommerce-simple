import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import { swaggerUiSetup, swaggerUiDocs } from "./config/swagger.js";

dotenv.config();
connectDB();

const app = express();

// Swagger Documentation Route
app.use("/api-docs", swaggerUiSetup, swaggerUiDocs);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
