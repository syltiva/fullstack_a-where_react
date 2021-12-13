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

const NavBar = () => {
  const { loggedIn, logoutUser, user, userName } = useContext(AuthContext);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <NavLink to="/">a-where</NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown> */}
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav>
                {user ? (
                  <>
                    <button
                      onClick={logoutUser}
                      className="btn btn-outline-dark"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-light">
                      Log In
                    </Link>
                    <Link to="/signup" className="btn btn-outline-light">
                      Sign Up
                    </Link>
                  </>
                )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
