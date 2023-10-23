const express=require("express")
const { fetchAllProducts, createProduct, fetchProductById, updateProduct } = require("../controllers/product")

const router=express.Router()

router.route("/").get(fetchAllProducts).post(createProduct)
router.route("/:id").get(fetchProductById).patch(updateProduct)

module.exports=router