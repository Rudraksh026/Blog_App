import { useNavigate } from "react-router";
import { UserAuth } from "../Context/Context";
import { useEffect } from "react";
export const Logout = () => {
    const {logout} = UserAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    useEffect(() => {
        handleLogout()
    },[])

}