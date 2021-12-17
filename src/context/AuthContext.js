import { createContext, useEffect, useState } from 'react';
import apiHelper from '../apiHelper/apiHelper'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const AuthContext = createContext({})



const AuthProvider = ({children}) => {
    const jwt_string = "jwtawhere"

    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

    useEffect(() => {
        checkedLogged()
    }, [])

    const checkedLogged = () => {
        const tokenValue = JSON.parse(localStorage.getItem(jwt_string));
        try {
            setUserName(tokenValue.user.name); 
        }   catch (error) {
            console.log(error)
        }
        return tokenValue ? setLoggedIn(true) : setLoggedIn(false);
    }

    const setLocalStorageToken = (data) => {
        localStorage.setItem(jwt_string, JSON.stringify(data))
    }

    const signupUser = async (obj) => {
        const response = await apiHelper.post("/auth/signup", obj);
        if (response.data) {
            setLocalStorageToken(response.data);
            toast.success("Signed up & logged in, Welcome!")
            setLoggedIn(true);
            setUser({
                name: "",
                email: "",
                password: "",
                role: ""
            })
        }
    }

    const loginUser = async (obj) => {
        const response = await apiHelper.post("/auth/login", obj);
        if (response.data) {
            setLocalStorageToken(response.data);
            toast.success("Logged in, Welcome!")
            setLoggedIn(true);
            setUser({
                name: "",
                emaill: "",
                password: "",
                role: ""
            })
            
        }
    }

    const logoutUser = () => {
        toast.warning("Logged out, Goodbye!")
        localStorage.removeItem(jwt_string);
       

    }


        return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loggedIn,
                loginUser,
                logoutUser,
                signupUser, 
                userName,
                
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;