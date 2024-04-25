import User from '../models/userModel.js';
import Product from "../models/proudctModel.js"
import Cart from '../models/cartModel.js';



//user can add product in to the cart
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.params;

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find product - Corrected: added await
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create cart item
        let cartItem = await Cart.findOne({ userId: user._id, productId: product._id });

        // If the product already exists in the cart, increment quantity
        if (cartItem) {
            cartItem.quantity++;
            await cartItem.save();
        } else {
            // If the product does not exist, create a new cart item
            cartItem = await Cart.create({
                userId: user._id,
                productId: product._id,
                quantity: 1
            });
        }

        // Add product to user's cart
        user.cart.push(cartItem._id);
        await user.save();

        return res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// import User from '../models/userModel.js';
// import Product from '../models/proudctModel.js'
// import Cart from '../models/cartModel.js';

// export const addToCart = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { productId } = req.params;

//         // Find user
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Find product
//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Find or create cart item
//         let cartItem = await Cart.findOne({ userId: user._id, productId: product._id });

//         // If the product already exists in the cart, increment quantity
//         if (cartItem) {
//             cartItem.quantity++;
//             await cartItem.save();
//         } else {
//             // If the product does not exist, create a new cart item
//             cartItem = await Cart.create({
//                 userId: user._id,
//                 productId: product._id,
//                 quantity: 1
//             });
//         }

//         // Add product to user's cart
//         user.cart.push(cartItem._id);
//         await user.save();

//         return res.status(200).json({ message: "Product added to cart successfully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };



//view product in the cart


export const viewCart = async(req,res)=>{
    try {
        const {id}=req.params
        const user = await User.findById(id).populate({
            path : 'cart',
            populate : { path : 'productId'}
        });

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(!user.cart || user.cart.length === 0){
            return res.status(200).json({message:"user cart is empty" , data:[]})
        }
        res.status(200).json(user.cart)
    } catch (error) {

        return res.status(404).json({message:"internal server error"})
        
    }
}


