import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext"

const SignupView = () => {
    const { user, signupUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signupUser({name: user.name, email: user.email, password: user.password});
        navigate("/")
    }

    return (
        <div className= "container mt-5">
            <form className= "form">
                <h2> Sign Up </h2>
                    <input
                        name= "name"
                        value= {user.name}
                        onChange= {handleChange}
                        className= "form-control"
                        type= "text"
                        placeholder= "name"
                    />
                    <input
                        name= "email"
                        value= {user.email}
                        onChange={handleChange}
                        className= "form-control"
                        type= "email"
                        placeholder= "email"
                    />
                    <input
                        name= "password"
                        value= {user.password}
                        onChange= {handleChange}
                        className= "form-control"
                        type= "password"
                        placeholder= "password"
                    />
                    <button
                        onClick= {handleSubmit}
                        className= "form-control btn btn-outline-dark">
                            Sign Up
                    </button>
            </form>
        </div>
    )
}

export default SignupView;