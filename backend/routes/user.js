const express=require("express")
const { fetchUserById, updateUser } = require("../controllers/user")

const router=express.Router()

router.route("/:id").get(fetchUserById).patch(updateUser)

exports.userRouter=router