import express from "express"
import { cloudinaryUploadImg } from "../middleWares/uploadImage.js"
import { createProduct } from "../Controller/adminProductController.js"
import { adminLogin } from "../Controller/adminLoginController.js"

const router = express.Router()

router.post('/add',cloudinaryUploadImg, createProduct)
router.get('/login' , adminLogin)

export default router