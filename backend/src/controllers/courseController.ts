import { Request, Response } from "express";
import Course from "../models/course";
import mongoose from "mongoose";

// Get all courses
export const getCourses = async (
  req: Request,
  res: Response
) => {
  try {
    const courses = await Course.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// Get one course by ID
export const getCourseById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const createCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      price,
      instructor,
      thumbnail,
    } = req.body;

    if (!title || !description || price === undefined || !instructor) {
      return res.status(400).json({
        message: "Title, description, price, and instructor are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      instructor,
      thumbnail,
    });

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const updateCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      instructor,
      thumbnail,
    } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        instructor,
        thumbnail,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const deleteCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};