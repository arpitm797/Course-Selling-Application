import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [instructor, setInstructor] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Please sign in first
          </h2>

          <button
            onClick={() => navigate("/signin")}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await createCourse(
        {
          title,
          description,
          price: Number(price),
          instructor,
          thumbnail,
        },
        token
      );

      setMessage("Course created successfully!");

      setTitle("");
      setDescription("");
      setPrice("");
      setInstructor("");
      setThumbnail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Welcome, {user.name || user.email}
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your courses from here.
          </p>
        </div>

        {user.role === "admin" ? (
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Add New Course
            </h2>

            {message && (
              <div className="mb-5 rounded-lg bg-green-100 px-4 py-3 text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Course Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter course title"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Enter course description"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Price
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="999"
                    min="0"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Instructor
                  </label>

                  <input
                    type="text"
                    value={instructor}
                    onChange={(event) =>
                      setInstructor(event.target.value)
                    }
                    placeholder="Instructor name"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Thumbnail URL
                </label>

                <input
                  type="url"
                  value={thumbnail}
                  onChange={(event) =>
                    setThumbnail(event.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Course
              </button>
            </form>
          </section>
        ) : (
          <section className="rounded-2xl bg-white p-8 text-center shadow-md">
            <h2 className="text-2xl font-bold text-slate-900">
              Student Dashboard
            </h2>

            <p className="mt-3 text-slate-600">
              Your enrolled courses will appear here.
            </p>
          </section>
        )}
      </div>
    </main>
  );
};

export default Dashboard;