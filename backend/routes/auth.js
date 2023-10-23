const express=require("express")
const { createUser, loginUser } = require("../controllers/auth")

const router=express.Router()

router.route("/signup").post(createUser)
router.route("/login").post(loginUser)

exports.authRouter=router