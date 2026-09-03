const API_URL = import.meta.env.VITE_BACKEND_URL;

export type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  thumbnail?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const signinUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signin failed");
  }

  return data;
};

export const getCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${API_URL}/courses`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch courses");
  }

  return data.courses;
};

export const getCourseById = async (
  id: string
): Promise<Course> => {
  const response = await fetch(`${API_URL}/courses/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch course");
  }

  return data.course;
};

export const createCourse = async (
  courseData: {
    title: string;
    description: string;
    price: number;
    instructor: string;
    thumbnail?: string;
  },
  token: string
) => {
  const response = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create course");
  }

  return data;
};

export const deleteCourse = async (
  id: string
): Promise<void> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete course");
  }
};