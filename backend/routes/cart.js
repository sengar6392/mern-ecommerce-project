const express=require("express")
const { fetchCartByUser, addToCart, deleteCart, updateCart } = require("../controllers/cart")

const router=express.Router()

router.route("/").get(fetchCartByUser).post(addToCart)
router.route("/:id").delete(deleteCart).patch(updateCart)

exports.cartRouter=router