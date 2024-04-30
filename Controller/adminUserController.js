import User from "../models/userModel.js";




//list all user

export const allUser = async (req,res)=>{
    try {

        const allUser = await User.find()

        if(allUser.length ===0){
           return res.status(404).json({message:"no user is found"})
        }
        res.status(200).json({allUser})
        
    } catch (error) {
        res.status(404).json({message:error})
    }
}



//admin can view user by id


export const adminViewUserById =async (req,res)=>{

    try {
        const {id} =req.params
        const oneUser = await User.findById(id)

        if(!oneUser){
           return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({oneUser})



        
    } catch (error) {
        res.status(404).json({message:"internal server error"})
        
    }
}