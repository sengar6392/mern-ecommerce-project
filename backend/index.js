
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// Import routes
import productRouter from "./routes/product.js"
import categoryRouter from "./routes/category.js"
import brandRouter from "./routes/brand.js"
import userRouter from "./routes/user.js"
import cartRouter from "./routes/cart.js"
import orderRouter from "./routes/order.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

const server = express();
dotenv.config()

server.use(cors({
 exposedHeaders:['X-Total-Count'],
 origin:'http://localhost:3000',
 credentials:true
}));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

// Routes
server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);
server.use("/users", userRouter);
server.use("/cart", cartRouter)
server.use("/orders", orderRouter)

// Error handling middlewares
server.use(notFound)
server.use(errorHandler)
main().catch((err) => console.log(err));
async function main() {
  // connection to local database
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("database connected");
}

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
