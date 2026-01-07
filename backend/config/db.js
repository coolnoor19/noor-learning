import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/noor-learning")
        console.log("db connected successfully")
        
    } catch (error) {
        
    }
}