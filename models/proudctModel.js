import { boolean } from 'joi'
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
{
    title:{
        type:string,
        require:true
    },
    description : {
        type:string,
        require:true
    },
    price :{
        type:Number,
        require:true
    },
    image:{
        type:string,
        require:true
    },
    category:{
        type:string,
        require:true
    },
    isDeletes:{
        type:boolean,
        default:false
    }

}
)

const Product =mongoose.model('Product',productSchema)
export default productSchema