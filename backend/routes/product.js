import express from "express"
import { fetchAllProducts, createProduct, fetchProductById, updateProduct } from "../controllers/product.js"

const router=express.Router()

router.route("/").get(fetchAllProducts).post(createProduct)
router.route("/:id").get(fetchProductById).patch(updateProduct)

export default router