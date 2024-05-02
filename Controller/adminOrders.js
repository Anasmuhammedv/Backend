
import Orders from "../models/orderModel.js";




//Order details
 
   export const adminOrderDetails = async(req,res)=>{
    try {

        const orders = await Orders.find();
        if(!orders || orders.length==0){
            return res.status(404).json({message:"no order found"})
        }
        res.status(200).json(orders)
        
    } catch (error) {
        res.status(404).json({message:"internal server error"})
        
    }
   }