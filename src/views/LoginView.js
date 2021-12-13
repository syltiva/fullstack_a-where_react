import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router'


const LoginView = () => {
    const navigate = useNavigate();
    const {user, setUser, loginUser} = useContext(AuthContext);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser({email: user.email, password: user.password});
        setUser({
            name: "",
            email: "",
            password: "",
            role: ""
        })
        navigate("/")
    }

    return (
        <div className="container mt-5">
            <form className="form">
                <h2>Log In</h2>
                <input
                    name= "email"
                    value= {user.email}
                    onChange= {handleChange}
                    className= "form-control"
                    type= "text"
                    placeholder= "email"
                />
                <input
                    name= "password"
                    value= {user.password}
                    onChange= {handleChange}
                    className= "form-control"
                    type= "password"
                    placeholder='password'
                />
                <button
                onClick={handleSubmit}
                className= "form-control btn btn-outline-dark">
                    Log In
                </button>
            </form>
        </div>
    )
}

export default LoginView;