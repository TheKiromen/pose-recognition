import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Components/navbarStyle.css";
import Button from "react-bootstrap/Button";
import {useNavigate, Outlet} from "react-router";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import {useUserAuth} from "./MonitorAuth";

//FIXME Try to fix logout button from flickering when your session is active and you navigate through application

const MainNavbar = () => {
    //Preparation of the code for further operation
    const logged = useUserAuth();

    const HandleLogout = () => {
        console.log("logout");
        //localStorage.setItem("authenticated", false)
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            //<Link to="/login"/>
        }).catch((error) => {
            // An error happened.
        });


    };
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Pose recognition</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="login">Login</Nav.Link>
                        {/*<Nav.Link href="singin">Singin</Nav.Link>*/}
                        <Nav.Link href="controlPanel">Control Panel</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {/* The way of being logged in will change so for now only a placeholder wil be put in place */}
                <div id="logout">
                    {logged ? <Button onClick={HandleLogout} variant="danger">
                            Logout👋
                        </Button>
                    : <Link to="/Login"><Button variant="success">
                            Login👋
                        </Button>
                        </Link>
                    }
                </div>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;