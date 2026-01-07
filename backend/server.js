import express from 'express'
import todoRoute from './route/v1/todo.js';
import cookieParser  from 'cookie-parser';
import { connectDb } from './config/db.js';


const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/todos" , todoRoute)

app.get("/" , (req , res)=>{
    res.send("hellow from express server")
})


 connectDb()
app.listen(3003, ()=>{
   
    console.log("server is running on port 3003")
})