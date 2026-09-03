import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getCourses, type Course } from "../api";

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <main>
      <section className="mx-auto max-w-7xl items-center  px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Learn at your own pace
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Build skills that move your career forward.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Learn practical skills through carefully designed courses,
            hands-on projects, and lessons created for real-world growth.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore courses
            </Link>

            <a
              href="#featured"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              View featured
            </a>
          </div>

          <div className="mt-10 flex gap-8">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {courses.length}+
              </p>
              <p className="text-sm text-slate-500">Courses</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                1,000+
              </p>
              <p className="text-sm text-slate-500">Students</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                4.8
              </p>
              <p className="text-sm text-slate-500">Average rating</p>
            </div>
          </div>
        </div>

        
      </section>

      <section
        id="featured"
        className="bg-white px-6 py-16"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Start learning
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Popular courses
          </h2>

          <p className="mt-3 text-slate-600">
            Learn skills that you can use to build real projects.
          </p>

          {loading ? (
            <p className="mt-10 text-slate-600">
              Loading courses...
            </p>
          ) : courses.length === 0 ? (
            <p className="mt-10 text-slate-600">
              No courses are available yet.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;