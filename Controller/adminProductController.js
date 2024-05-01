import Product from '../models/proudctModel.js'
import { productJoi } from '../middleWares/joiValidation.js'





export const createProduct = async (req,res)=>{
    try {
         
        const validatedProduct = await productJoi.validateAsync(req.body);

 //admin can add new product
        const newProduct =new Product({
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


//Admin can see the product by id

     export const adminViewProductById = async (req,res)=>{
        try {

            const {id}=req.params

            const productById = await Product.findById(id)
            
            if(!productById){
               return res.status(404).json({message:"product not found in this id"})
            }
            res.status(200).json({productById})
            
        } catch (error) {
            res.status(404).json({message:"internal server error"})
            
        }
     }


//admin can view product by category


export const AdminViewProductByCategory = async (req,res)=>{
    try {

        const { categoryName}= req.params

        const productCategory = await Product.find({
            $or :[
                {category : {$regex : new RegExp(categoryName , 'i')}},
                {title:{$regex : new RegExp(categoryName,'i')}}
            ]
        }).select('title category price')

        if(productCategory.length===0 || !productCategory){
           return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({productCategory})
        
    } catch (error) {

        res.status(404).json({message:"internal server error"})
        
    }
 }
   

     