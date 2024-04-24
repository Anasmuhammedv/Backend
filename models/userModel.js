import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
    {
        username : {
            type:String,
            required:true
        },
        email : {
            type:String,
            required:true
        },
        password : {
            type:String,
            required:true
        },
        profileImg : {
            type:String,
            required:true
        },
        accountCreateDate : {
            type:Date,
            required:true,
            default:Date.now
        },
        isDeleted : {
            type:Boolean,
            default:false
        },
        cart:[{
            type:mongoose.Schema.ObjectId,
            ref:"Cart"
        }]

    }
)
const User = mongoose.model("User",userSchema)
export default User