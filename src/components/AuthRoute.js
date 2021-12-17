import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import LoginView from "../views/LoginView"

const AuthRoute = () => {
    const {loggedIn } = useContext(AuthContext)

    return loggedIn ? <Outlet/> : <LoginView/>
}

export default AuthRoute;