import User from '../models/userModel'
import Product from '../models/proudctModel'
import Cart from '../models/cartModel';

export const addToCart = async(req,res)=>{
    try {

        const userId =req.params.userId;
        const productId = req.params.productId;

        //find user
        const user =User.findById(userId)

        if(!user){
            res.status(404).json({message:"user not found"})
        }

        //findProduct
        const product = Product.findById(productId)

        if(!product){
            res.status(404).json({message:"product Not found"})
        }

        //create cart

        let cartItem = Cart.findOne({userId:user._id , productId:uroduct._id})
        

        //if the product already exist quantity increment
        if(cartItem){
           cartItem.quantity++;
           await cartItem.save()
        }else{

            //if the product doesnot exist create new cart
            cartItem = await Cart.create({
                userId:user._id,
                productId:product._id,
                quantity:1

            });
        }

        //add product to user cart
        user.cart.push(cartItem._id);
        await user.save();

        return res.status(200).json({message:"product added to cart"})

    } catch (error) {
        
        res.status(400).json({message:"cannot add product"})
    }
}