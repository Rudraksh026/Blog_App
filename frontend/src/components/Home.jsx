import { NavLink } from "react-router";
import { BlogCart } from "./BlogCart";
import { useEffect, useState } from "react";
export const Home = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:5000/getBlog");
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);
  
  return (
    <>

      <section className="bg-indigo-600 text-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Coding Blog</h2>
        <p className="text-lg mb-6">
          Tips, tutorials & stories from a developer's life.
        </p>
        <NavLink
          to="/blogs"
          className="bg-white text-indigo-600 px-6 py-2 font-semibold rounded hover:bg-gray-200"
        >
          Read Latest Posts
        </NavLink>
      </section>

      <section id="blogs" className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">Featured Posts</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <BlogCart blogs={blogs[0]}/>
          <BlogCart blogs={blogs[1]}/>
          <BlogCart blogs={blogs[2]}/>
        </div>
      </section>

      <section id="categories" className="bg-gray-50 py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">Browse Categories</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">
            JavaScript
          </span>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">
            React
          </span>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">
            Node.js
          </span>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">
            Web Design
          </span>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">
            Career
          </span>
        </div>
      </section>
    </>
  );
};
