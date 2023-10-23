const express=require("express")
const { fetchBrands, createBrand } = require("../controllers/brand")

const router=express.Router()

router.route("/").get(fetchBrands).post(createBrand)

module.exports=router