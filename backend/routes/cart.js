import express from "express"
import { fetchCartByUser, addToCart, deleteCart, updateCart, clearCartByUser } from "../controllers/cart.js"

const router=express.Router()

router.route("/").get(fetchCartByUser).post(addToCart).delete(clearCartByUser)
router.route("/:id").delete(deleteCart).patch(updateCart)

export default router