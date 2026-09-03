

import { Link } from "react-router-dom";
import type { Course } from "../api";

type CourseCardProps = {
  course: Course;
};

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <span className="text-5xl font-bold text-white">
          {course.title.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-blue-600">
          Development
        </p>

        <h3 className="mt-2 line-clamp-2 text-xl font-bold text-slate-900">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          Instructor: {course.instructor}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xl font-bold text-slate-900">
            ₹{course.price}
          </p>

          <Link
            to={`/courses/${course._id}`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;