import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById, type Course } from "../api";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;

      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load this course.");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p className="text-slate-600">Loading course...</p>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p className="text-red-600">
          {error || "Course not found"}
        </p>

        <Link
          to="/courses"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Back to courses
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <Link
        to="/courses"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to courses
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="flex h-80 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
          <span className="text-8xl font-bold text-white">
            {course.title.charAt(0).toUpperCase()}
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Development course
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            {course.title}
          </h1>

          <p className="mt-6 leading-8 text-slate-600">
            {course.description}
          </p>

          <div className="mt-6 space-y-3 text-slate-600">
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>

            <p>
              <strong>Course format:</strong> Online learning
            </p>

            <p>
              <strong>Access:</strong> Lifetime access
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-100 p-5">
            <div>
              <p className="text-sm text-slate-500">
                Course price
              </p>

              <p className="text-3xl font-bold text-slate-900">
                ₹{course.price}
              </p>
            </div>

            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Enroll now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CourseDetails;