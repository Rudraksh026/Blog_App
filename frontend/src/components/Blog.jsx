import { BlogCart } from "./BlogCart";
import { useState,useEffect } from "react";
export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const[category,setCategory] = useState("")

  const[active,setActive] = useState("")

  const handleCategory = (val) => {
    console.log(val)
    setCategory(val)
    setActive(val)
  }

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
      {/* <!-- Search + Categories --> */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          

          {/* <!-- Category Filter --> */}
          <div className="flex flex-wrap gap-2">
            <button onClick={()=> handleCategory("")} className={`px-4 py-1 rounded-full text-sm ${active==``?`bg-indigo-100 text-indigo-700`:`bg-gray-100 text-gray-700`}`} >
              All
            </button>
            <button onClick={()=> handleCategory("javascript")} className={`px-4 py-1 rounded-full text-sm ${active==`javascript`?`bg-indigo-100 text-indigo-700`:`bg-gray-100 text-gray-700`}`}>
              JavaScript
            </button>
            <button onClick={()=> handleCategory("react")} className={`px-4 py-1 rounded-full text-sm ${active==`react`?`bg-indigo-100 text-indigo-700`:`bg-gray-100 text-gray-700`}`}>
              React
            </button>
            <button onClick={()=> handleCategory("career")} className={`px-4 py-1 rounded-full text-sm ${active==`career`?`bg-indigo-100 text-indigo-700`:`bg-gray-100 text-gray-700`}`}>
              Career
            </button>
          </div>
        </div>

        {/* <!-- Blog Grid --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <!-- Blog Card --> */}
          {blogs.map((element)=> {
            if(category == "")
              return <BlogCart blogs={element}/>
            else if(category == element.category)
              return <BlogCart blogs={element}/>
          })}
        </div>
      </section>
    </>
  );
};
