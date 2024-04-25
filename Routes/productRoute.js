import express from 'express'
import { allProducts, productByCategory, productById } from '../Controller/productController.js'
import { userToken } from '../middleWares/userMiddleware.js'
import { addToCart } from '../Controller/cartController.js'


const router = express.Router()


router.get('/allProducts',userToken, allProducts)
router.get('/productsBy/:id',userToken , productById)
router.get("/products/category/:categoryName" , userToken , productByCategory)



//cart Routes

router.post('/:userId/cart/:productId', userToken, addToCart)

export default router


