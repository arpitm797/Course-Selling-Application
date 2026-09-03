import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Routes from "./routes/routes";
import router from "./routes/routes";
import courseRoutes from "./routes/courseRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", Routes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Course Selling App Backend is running!");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });