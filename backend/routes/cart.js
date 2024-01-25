import express from "express"
import { fetchCartByUser, addToCart, deleteCart, updateCart, clearCartByUser } from "../controllers/cart.js"
import { protect } from "../middleware/authMiddleware.js"

const router=express.Router()
router.use(protect)
router.route("/").get(fetchCartByUser).post(addToCart).delete(deleteCart).patch(updateCart)
router.route("/clear").delete(clearCartByUser)
export default router