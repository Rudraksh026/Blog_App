import { NavBar } from "./NavBar"
import { Outlet } from "react-router"
import { Footer } from "./Footer"
export const Layout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}