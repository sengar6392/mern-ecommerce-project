const express=require("express")
const { fetchCategories, createCategory } = require("../controllers/category")

const router=express.Router()

router.route("/").get(fetchCategories).post(createCategory)

module.exports=router