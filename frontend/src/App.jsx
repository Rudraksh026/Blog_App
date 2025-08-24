import "./App.css"
import { Home } from "./components/Home"
import { createBrowserRouter, RouterProvider } from "react-router"
import { Layout } from "./UI/Layout"
import { Blog } from "./components/Blog"
import { DetailBlog } from "./components/DetailBlog"
import { Login } from "./components/Login"
import { SignUp } from "./components/SignUp"
import { Logout } from "./components/Logout"
import { AddBlog } from "./components/AddBlog"
function App () {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/blogs",
          element: <Blog />,
        },
        {
          path:"/:id",
          element:<DetailBlog />
        },{
          path:"/register",
          element:<SignUp />
        },{
          path:"/logout",
          element:<Logout />
        },{
          path:"/addblog",
          element:<AddBlog />
        }
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App