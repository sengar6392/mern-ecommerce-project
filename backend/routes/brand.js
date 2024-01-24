import express from "express"
import { fetchBrands, createBrand } from "../controllers/brand.js"

const router=express.Router()

router.route("/").get(fetchBrands).post(createBrand)

export default router