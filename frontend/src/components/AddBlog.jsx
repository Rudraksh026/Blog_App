import { useEffect, useState } from "react";
import { UserAuth } from "../Context/Context";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router";

export const AddBlog = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    coverImage: null, // keep file, not string
    content: "",
    category: "",
    date: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setBlogData((prev) => ({
        ...prev,
        email: user,
        date: new Date().toISOString(),
      }));
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleValue = (e) => {
    const { name, value, files } = e.target;

    // handle file input separately
    if (name === "coverImage") {
      setBlogData({
        ...blogData,
        coverImage: files[0],
      });
    } else {
      setBlogData({
        ...blogData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);
    formData.append("date", blogData.date);
    formData.append("email", blogData.email);
    if (blogData.coverImage) {
      formData.append("coverImage", blogData.coverImage);
    }

    try {
      const response = await fetch("https://blog-app-13pi.onrender.com/addblog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Blog Added Successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
          transition: Bounce,
        });
        setBlogData({
          title: "",
          coverImage: null,
          content: "",
          category: "",
          date: new Date().toISOString(),
          email: user,
        });
      } else {
        const error = await response.json();
        toast.error(error.message || "Something went wrong", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Server Error", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-50 text-gray-900">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Add New Blog Post</h2>
            <p className="text-sm text-gray-600">
              Create and publish a new article. Fields marked * are required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            id="postForm"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left column */}
            <section className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-xl shadow p-5 space-y-4">
                <label className="block text-sm font-medium">Title *</label>
                <input
                  id="title"
                  type="text"
                  required
                  name="title"
                  placeholder="e.g., Mastering Async/Await in JavaScript"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  onChange={handleValue}
                  value={blogData.title}
                />
              </div>

              {/* Cover Image */}
              <div className="bg-white rounded-xl shadow p-5">
                <label className="block text-sm font-medium mb-2">
                  Cover Image
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="cover"
                    className="cursor-pointer rounded-lg border border-dashed border-gray-300 p-6 w-full text-center hover:bg-gray-50"
                  >
                    <input
                      id="cover"
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      className="hidden"
                      onChange={handleValue}
                    />
                    <p className="text-sm">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to ~5MB</p>
                  </label>

                  {/* preview */}
                  {blogData.coverImage && (
                    <img
                      src={URL.createObjectURL(blogData.coverImage)}
                      alt="Preview"
                      className="w-28 h-20 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl shadow p-5">
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  id="content"
                  required
                  rows="14"
                  name="content"
                  placeholder="Write your article here..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  onChange={handleValue}
                  value={blogData.content}
                ></textarea>
              </div>
            </section>

            {/* Right column */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow p-5">
                <label className="block text-sm font-medium">Category</label>
                <select
                  id="category"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  name="category"
                  onChange={handleValue}
                  value={blogData.category}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="javascript">JavaScript</option>
                  <option value="react">React</option>
                  <option value="node.js">Node.js</option>
                  <option value="career">Career</option>
                  <option value="web design">Web Design</option>
                </select>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <button
                  type="submit"
                  className="w-full px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </aside>
          </form>
        </main>
      </div>
    </>
  );
};
