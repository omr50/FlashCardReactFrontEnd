import {Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "./security/AuthContext";
function HeaderComponent() {
    const AuthContext = useAuth();
    const isAuthenticated = AuthContext.isAuthenticated;

    function logout() {
        AuthContext.logout()
    }
    return (
        <Navbar bg="light" expand="lg" style={{padding:"10px"}}>
        <Link to="/" className='nav-link'>
            <Navbar.Brand className='ms-2 fs-2 fw-bold text-black'>Study</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Link to="/todos" className='nav-link'>Todos</Link>
          <Link to="/flashcards" className='nav-link'>Flashcards</Link>
            {/* <Nav.Link href="#contact">Contact</Nav.Link> */}
          </Nav>
          <Nav className="auth-buttons">
            {!isAuthenticated && <Link to="/login" className='nav-link'>Log In</Link>}
            {!isAuthenticated && <Link to="/signup" className='nav-link'>Sign Up</Link>}
            {isAuthenticated && <Link to='/logout' className='nav-link' onClick={logout}>Log Out</Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}


export default HeaderComponent;