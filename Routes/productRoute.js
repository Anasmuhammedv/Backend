import express from 'express'
import { allProducts, productByCategory, productById } from '../Controller/productController.js'
import { userToken } from '../middleWares/userMiddleware.js'
import { addToCart, decrementCartQuantity, incrementCartQuantity, removeCart, viewCart } from '../Controller/cartController.js'


const router = express.Router()


router.get('/allProducts',userToken, allProducts)
router.get('/products/:id',userToken , productById)
router.get("/products/category/:categoryName" , userToken , productByCategory)



//cart Routes

router.post('/:userId/cart/:productId', userToken, addToCart)
router.get('/cart/:id', userToken, viewCart)
router.post('/:userId/cart/:productId/increment', userToken,incrementCartQuantity )
router.post('/:userId/cart/:productId/decrement', userToken,decrementCartQuantity )
router.post('/:userId/cart/:productId/remove', userToken,removeCart )

export default router


