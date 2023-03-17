import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Components/navbarStyle.css";

function MainNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Pose recognition</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="singin">Singin</Nav.Link>
                        <Nav.Link href="controlPanel">Control Panel</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {/* The way of being logged in will change so for now only a placeholder wil be put in place */}
                <div id="logout">
                    <Nav.Link href="logout">Logout</Nav.Link>
                </div>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;