import express from "express"
import { fetchCategories, createCategory } from "../controllers/category.js"

const router=express.Router()

router.route("/").get(fetchCategories).post(createCategory)

export default router