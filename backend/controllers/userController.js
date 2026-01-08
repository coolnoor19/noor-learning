import User from "../models/User.js";
import bcrypt from "bcrypt"

async function createUser( req , res){
    const { name , email , password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password , 10)
        const signupUser = await User.create({
            name,
            email,
            password : hashedPassword
        })

        res.status(201).json({
            message : "user created successfully",
            signupUser
        })
    } catch (error) {
        res.status(500).json({
            message: "error creating user",
            error: error.message
        })
    }
}



export  {createUser} ;