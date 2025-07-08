import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db.js";
import productRoutes from "./routes/product.route.js";
import AuthRoutes from "./routes/auth.route.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(port, () => {
  connectDB();
  console.log(
    `server is started successfuly at http://localhost:${port}/api/products`
  );
});
