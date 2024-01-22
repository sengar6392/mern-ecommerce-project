const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const {userRouter} = require("./routes/user");
const {authRouter}  = require("./routes/auth");
const cors = require("cors");
const { cartRouter } = require("./routes/cart");
const { orderRouter } = require("./routes/order");

const server = express();

server.use(cors({
 exposedHeaders:['X-Total-Count']
}));

server.use(express.json());
server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);
server.use("/users", userRouter);
server.use("/auth", authRouter)
server.use("/cart", cartRouter)
server.use("/orders", orderRouter)
main().catch((err) => console.log(err));
async function main() {
  // connection to local database
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("database connected");
}

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
