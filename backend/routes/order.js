import express from "express"
import { fetchOrderByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } from "../controllers/order.js"

const router=express.Router()

router.route("/").get(fetchAllOrders).post(createOrder)
router.route("/:id").delete(deleteOrder).patch(updateOrder)
router.route("/user/:userId").get(fetchOrderByUser)

export default router