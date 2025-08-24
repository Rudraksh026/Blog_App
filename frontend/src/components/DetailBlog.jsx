import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
export const DetailBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState({});
  const backPreviousPage = () => {
    navigate(-1);
  };
  const fetchBlog = async () => {
    const response = await fetch(`https://blog-app-13pi.onrender.com/blogs/${params.id}`);
    const data = await response.json();
    setBlog(data);
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  if (blog) {
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={backPreviousPage}
            className="text-indigo-600 hover:underline"
          >
            &larr; Back
          </button>
        </div>

        {/* <!-- Blog Hero --> */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <h1 className="text-4xl font-bold mb-4">
            {blog.title}
          </h1>
          <div className="text-gray-500 text-sm mb-6">
            🗓️ {blog.date} · ✍️ By {blog.authorName} · 🏷️{" "}
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
              {blog.category}
            </span>
          </div>
          <img
            src={blog.coverImage}
            alt="Blog banner"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        </section>

        {/* <!-- Blog Content --> */}
        <section className="max-w-4xl mx-auto px-4 pb-20 leading-relaxed text-lg text-gray-800 space-y-6">
          {blog.content}
        </section>

        {/* <!-- Author Box --> */}
        <section className="max-w-4xl mx-auto px-4 pb-10 border-t pt-6 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold">{blog.authorName}</p>
            </div>
          </div>
        </section>
      </>
    );
  }
};
