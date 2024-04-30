import express from "express"
import { cloudinaryUploadImg } from "../middleWares/uploadImage.js"
import { createProduct } from "../Controller/adminProductController.js"
import { adminLogin} from "../Controller/adminLoginController.js"
import { adminToken } from "../middleWares/adminMidddleware.js"
import { adminViewUserById, allUser } from "../Controller/adminUserController.js"

const router = express.Router()

router.post('/add',cloudinaryUploadImg, createProduct)
router.get('/login' , adminLogin)
router.get('/allUser' ,adminToken,allUser)
router.get('/user/:id' , adminViewUserById)

export default router