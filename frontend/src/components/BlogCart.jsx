import { NavLink } from "react-router"
export const BlogCart = ({blogs}) => {
  if(blogs){
    const date = new Date(blogs.date);
    return (
        <>
            <div className="bg-white border rounded-lg shadow hover:shadow-md transition">
            <img
              src={`${blogs.coverImage}`}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {blogs.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-500">
                <span>🗓️ {date.toDateString()}</span>
                <NavLink to={`/${blogs._id}`} className="text-indigo-600 hover:underline">
                  Read more →
                </NavLink>
              </div>
            </div>
          </div>
        </>
    )
}}