import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken{
    userId: string;
    role: "user" | "admin";
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction)=>{
    try{
        const authHeader= req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "no token provided"
            })
        }
        if(!authHeader.startsWith("Bearer")){
            return res.status(401).json({
                message: "invalid token format"
            })
        }
        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET!
        )as DecodedToken;

        next();

    }catch(error){
        return res.status(401).json({
            message: " invalid or expired tokrn"
        })
    }
    
  }

  export const adminOnly=(req:Request,res:Response, next:NextFunction)=>{
    try {
        const authHeader= req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No valid token provided",
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

     if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }
    next();
    } catch (error) {
        return res.status(401).json({
      message: "Invalid or expired token",
    });
    }
  }