import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { getCourses, type Course } from "../api";

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Course library
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Explore all courses
          </h1>

          <p className="mt-3 text-slate-600">
            Choose a course and start learning today.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 md:w-72"
        />
      </div>

      {loading && (
        <p className="mt-12 text-slate-600">
          Loading courses...
        </p>
      )}

      {error && (
        <p className="mt-12 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && filteredCourses.length === 0 && (
        <p className="mt-12 text-slate-600">
          No matching courses found.
        </p>
      )}

      {!loading && !error && filteredCourses.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Courses;