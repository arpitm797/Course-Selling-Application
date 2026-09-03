import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-slate-900"
        >
          LearnHub
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/courses"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Courses
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <span className="hidden text-sm text-slate-500 md:block">
                {user ? JSON.parse(user).name : "User"}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;