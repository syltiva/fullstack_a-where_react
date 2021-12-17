import { useContext } from "react";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  const { loggedIn, logoutUser, user, userName } = useContext(AuthContext);

  return (
 
      <Navbar className="navBar">
        <Container fluid>
          <NavLink to="/">a-where<img
          style={{
            width: "25px",
            height: "25px",
          }}
          src="https://res.cloudinary.com/syltiva/image/upload/v1639455191/orange-localization-icon-11_xycltq.png"
        /></NavLink>
        <Link to='/addincident' className='btn btn-outline-dark'>report an incident</Link>
        
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="justify-content-end">

            
            <Nav>
                {loggedIn ? (
                  <>
                    <button onClick={logoutUser} className="btn btn-outline-dark"
                    >log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-light">
                      log In
                    </Link>
                    <Link to="/signup" className="btn btn-outline-light">
                      sign Up
                    </Link>
                  </>
                )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  );
};

export default NavBar;
