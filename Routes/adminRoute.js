import express from "express"
import { cloudinaryUploadImg } from "../middleWares/uploadImage.js"
import {  AdminViewProductByCategory, adminAllProduct, adminDeleteProduct, adminUpdateProduct, adminViewProductById, createProduct } from "../Controller/adminProductController.js"
import { adminLogin} from "../Controller/adminLoginController.js"
import { adminToken } from "../middleWares/adminMidddleware.js"
import { adminDeleteUser, adminViewUserById, adminViewUserByUserName, allUser } from "../Controller/adminUserController.js"
import { adminOrderDetails, status } from "../Controller/adminOrders.js"

const router = express.Router()

router.post('/add',cloudinaryUploadImg, createProduct)
router.get('/login' , adminLogin)
router.get('/allUser' ,adminToken,allUser)
router.get('/user/:id' , adminViewUserById)
router.get('/userName/:userName' ,adminViewUserByUserName)
router.delete('/delete/:userId' , adminDeleteUser)
router.get('/product/:id', adminViewProductById)
router.get('/category/:categoryName' , AdminViewProductByCategory)
router.delete('/delete/:id' , adminDeleteProduct)
router.get('/allProduct' , adminAllProduct)
router.patch('/editProduct/:id',cloudinaryUploadImg , adminUpdateProduct)


router.get('/order' , adminOrderDetails)
router.get('/revenue' , status)


export default router