import express from "express"
import { cloudinaryUploadImg } from "../middleWares/uploadImage.js"
import { createProduct } from "../Controller/adminProductController.js"

const router = express.Router()

router.post('/add',cloudinaryUploadImg, createProduct)

export default router