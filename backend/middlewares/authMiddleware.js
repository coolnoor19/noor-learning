import jwt from "jsonwebtoken";

const JWT_SECRET = "thisisasecretkeyforjwttoken";  // Add this line


const authMiddleware = ( req , res, next ) =>{
 const { authorization} = req.headers;

    if(!authorization ){
        return res.status(401).json({
            message : "authorization header missing"
        })
    }
    const token = authorization.split(" ")[1];
    console.log("token from header" , token);

    if(!token){
        return res.status(401).json({
            message : "token missing"
        })
    }
     try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token from authMiddleware" });
  }
}

export default authMiddleware