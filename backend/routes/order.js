import express from "express"
import { fetchOrderByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } from "../controllers/order.js"
import { protect } from "../middleware/authMiddleware.js"

const router=express.Router()
router.use(protect)
router.route("/").get(fetchOrderByUser).post(createOrder)
router.route("/:id").delete(deleteOrder).patch(updateOrder)

export default router