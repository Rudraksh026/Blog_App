import { useState } from "react";
import { NavLink } from "react-router";
import { UserAuth } from "../Context/Context";
export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const { user } = UserAuth();

  return (
    <>
      <header className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          <h1 className="text-xl font-bold">CodeWithRudr</h1>

          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className="hover:text-indigo-400">
              Home
            </NavLink>
            <NavLink to="/blogs" className="hover:text-indigo-400">
              Blogs
            </NavLink>

             {user ? 
            <>
              <NavLink
                to="/logout"
                className="hover:text-indigo-400"
              >
                Logout
              </NavLink>
              <NavLink
                to="/addblog"
                className="hover:text-indigo-400"
              >
                Add Blog
              </NavLink>
            </>
          : 
            <>
              <NavLink
                to="/login"
                className="hover:text-indigo-400"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="hover:text-indigo-400"
              >
                Register
              </NavLink>
            </>
          }
          </nav>

          <button
            id="menuBtn"
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleToggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          id={`mobileMenu`}
          className={`md:hidden px-4 pb-4 ${menuOpen ? `` : `hidden`}`}
        >
          <NavLink
            to="/"
            className="hover:text-indigo-400"
          >
            Home
          </NavLink>
          <NavLink
            to="/blogs"
            className="hover:text-indigo-400"
          >
            Blogs
          </NavLink>

          {user ? 
            <>
              <NavLink
                to="/logout"
                className="hover:text-indigo-400"
              >
                Logout
              </NavLink>
              <NavLink
                to="/addblog"
                className="hover:text-indigo-400"
              >
                Add Blog
              </NavLink>
            </>
          : 
            <>
              <NavLink
                to="/login"
                className="hover:text-indigo-400"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="hover:text-indigo-400"
              >
                Register
              </NavLink>
            </>
          }
        </div>
      </header>
    </>
  );
};
