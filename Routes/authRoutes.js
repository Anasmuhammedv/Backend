import express from "express"
import { login, signup } from "../Controller/authController.js"
import  { cloudinaryUploadImg } from "../middleWares/uploadImage.js"

const router = express.Router() 

//user register
router.post('/register', cloudinaryUploadImg,  signup)

//user login
router.post('/Login', login)


export default router;

