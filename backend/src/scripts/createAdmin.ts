import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
console.log("Database:", mongoose.connection.name);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.findOneAndUpdate(
      { email: "admin@example.com" },
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        new: true,
        upsert: true,
      }
    );

    console.log("Admin account ready:");
    console.log({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();