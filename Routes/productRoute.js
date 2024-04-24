import express from 'express'
import { allProducts, productByCategory, productById } from '../Controller/productController.js'
import { userToken } from '../middleWares/userMiddleware.js'


const router = express.Router()


router.get('/allProducts',userToken, allProducts)
router.get('/productsBy/:id',userToken , productById)
router.get("/products/category/:categoryName" , userToken , productByCategory)

export default router


