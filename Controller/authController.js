import User from '../models/userModel.js';
import  {userJoi} from '../middleWares/joiValidation.js'
import  JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import errorhandler from '../middleWares/errorhandler.js'

import dotenv from "dotenv";
dotenv.config();


const jwt = JsonWebToken

//Register New User

export const signup = async (req, res) => {
    try {
        // Validate request body using Joi
        const validatedData = await userJoi.validateAsync(req.body);

        // Check if user already exists with the provided email
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(validatedData.password, 10);

        // Create a new user object
        const newUser = new User({
            email: validatedData.email,
            username: validatedData.username,
            password: hashedPassword,
            profileImg: req.cloudinaryImageUrl // Assuming this is set by the cloudinaryUploadImg middleware
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: "New user created" });
    } catch (error) {
        // Handle Joi validation errors
        if (error.isJoi) {
            return res.status(400).json({ message: "Invalid data", details: error.details });
        }

        // Handle other errors
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// export const signup = async (req, res) => {
//     try {
//         // Validate request body using Joi
//         const validatedData = await userJoi.validateAsync(req.body);

//         // Check if user already exists with the provided email
//         const existingUser = await User.findOne({ email: validatedData.email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash the password
//         const hashedPassword = bcrypt.hashSync(validatedData.password, 15);

//         // Create a new user object
//         const newUser = new User({
//             email: validatedData.email,
//             username: validatedData.username,
//             password: hashedPassword,
//             profileImg: req.cloudinaryImageUrl // Assuming this is set by the cloudinaryUploadImg middleware
//         });

//         // Save the new user to the database
//         await newUser.save();

//         // Respond with success message
//         res.status(201).json({ message: "New user created" });
//     } catch (error) {
//         // Handle errors
//         if (error.isJoi) {
//             return res.status(400).json({ message: "Invalid data", details: error.details });
//         }

//         console.error("Error during user registration:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };




//user login

export const login = async (req,res)=>{
    try {

        const {email , password } = req.body;


        //check weather user email is in mongodb
        const validUser = await User.findOne({email})
        if(!validUser) return res.status(401).json({message : "user not found"})

        //check password that enter by user to check valid or not
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return res.status(401).json({message : "invalid password"})

        //jwt setting
        const token = jwt.sign({id : validUser._id},process.env.USER_JWT_SECRET)
        const { password :hashedpassword, ...rest} =validUser._doc;
        const expiryDate = new Date(Date.now() + 60*1000);


        //cookie setting

        res.cookie('access_token' , token , {httpOnly:true , expires : expiryDate})
        .status(200).json(rest)
        console.log(token);


        
    } catch (error) {
        res.status(500).json({message:"logging declined"})
        
    }
}