import product from '../models/proudctModel.js'
import { productJoi } from '../middleWares/joiValidation.js'


export const createProduct = async (req,res)=>{
    try {
         
        const validatedProduct = await productJoi.validateAsync(req.body);

        //add new product
        const newProduct =new product({
            title:validatedProduct.title,
            description:validatedProduct.description,
            price:validatedProduct.price,
            category:validatedProduct.category,
            productImage:req.cloudinaryImageUrl

        })

        await newProduct.save()

        // Respond with success message
        res.status(201).json({ message: "New product added" });
        
        
    } catch (error) {
        if(error.isJoi === true){
            res.status(400).json({message:"invalid data",details:error.details})
        }
        
    }
}