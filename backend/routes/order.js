const express=require("express")
const { fetchOrderByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } = require("../controllers/order")

const router=express.Router()

router.route("/").get(fetchAllOrders).post(createOrder)
router.route("/:id").delete(deleteOrder).patch(updateOrder)
router.route("/user/:userId").get(fetchOrderByUser)
exports.orderRouter=router