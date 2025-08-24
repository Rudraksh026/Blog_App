import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user,setUser] = useState(null)


    useEffect(() => {
        const user = localStorage.getItem("user")
        if(user){
            setUser(user)
        }
    },[])

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    const login = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }) 
            const json = await response.json()
            if(response.status === 200){
                setUser(json)
                localStorage.setItem("user",json.existUser.email)
                return json
            }
            else{
                return json
            }
        } catch (error) {
        }
    }
    
    const register = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }) 
            const json = await response.json()
            if(response.status === 201){
                setUser(json)
                localStorage.setItem("user",json.response.email)
                return json
            }
            else{
                return json
            }
        } catch (error) {
        }
    }


    return (
        <UserContext.Provider value={{register,login,logout,user}}>
            {children}
        </UserContext.Provider>
    )
}


export const UserAuth = () => {
    return useContext(UserContext)
}

export default UserProvider