import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


let JWT_SECRET = "thisisasecretkeyforjwttoken"

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
            email : signupUser.email,
            id : signupUser._id,
            name : signupUser.name
        })
    } catch (error) {
        res.status(500).json({
            message: "error creating user",
            error: error.message
        })
    }
}

// async function loginUser( req, res){
//    const { email , password} = req.body;
//    try {
//     const user = await User.findOne({ email})
//     if(!user){
//         return res.status(404).json({
//             message : "user not found "
//         })
//     }
//     const isPasswordCorrect = await bcrypt.compare(password , user.password)
//     if(!isPasswordCorrect){
//         return res.status(401).json({
//             message : "incorrect password"
//         })
//     }

//     return res.status(200).json({
//         message : "successfully loggedin"
//     })
    
//    } catch (error) {
//     return res.status(500).json({
//         message : "error logging in user",
//         error : error.message
//     })
//    }
// }

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found, please signup first",
      });
    }

    // 2. Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // generate jwt token
    const token = jwt.sign(
        { userId : user._id },
        JWT_SECRET,
        { expiresIn : "1h"}
    )

    // 3. Login successful
    return res.status(200).json({
      message: "Login successful",  
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
}

export  {createUser , loginUser} ;