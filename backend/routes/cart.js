const express=require("express")
const { fetchCartByUser, addToCart, deleteCart, updateCart, clearCartByUser } = require("../controllers/cart")

const router=express.Router()

router.route("/").get(fetchCartByUser).post(addToCart).delete(clearCartByUser)
router.route("/:id").delete(deleteCart).patch(updateCart)

exports.cartRouter=router