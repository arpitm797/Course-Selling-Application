import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const generateToken = (userId: string, role: string)=>{
    return jwt.sign(
        {userId,role},
        process.env.JWT_SECRET!,
        { expiresIn:"7d"}
    )
}
export const signup = async (req:Request,res:Response) => {
    try {
        const {name , email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are req",
            });
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                message:"User already exists",
            })
        }
        

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        const token= generateToken(
            user.id.toString(),
            user.role
        )
        return res.status(201).json({
            message:"USer created successfully",
            token,
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("signup error",error);

        return res.status(500).json({
            message: "server error"
        })
        
    }
    
}

export const signin = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // 1. Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate token
    const token = generateToken(
      user._id.toString(),
      user.role
    );

    // 5. Send response
    return res.status(200).json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};