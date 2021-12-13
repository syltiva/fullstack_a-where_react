import { Outlet } from "react-router-dom"
import { isAuthenticated } from "../../../backend/controllers/userController";
import LoginView from "../views/LoginView"

const AuthRoute = () => {
    const user = isAuthenticated();

    return user ? <Outlet/> : <LoginView/>
}

export default AuthRoute;