import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Components/navbarStyle.css";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";


let isLogged = true;

const MainNavbar = () => {
    //Preparation of the code for further operation
    const navigate = useNavigate();
    //const test = localStorage.getItem("authenticated") === "true" ? true : false;
    const test = true;
    if (test){
        isLogged = true;
    }else{
        isLogged = false;
    }

    const HandleLogout = () => {
        console.log("logout");
        //localStorage.setItem("authenticated", false)
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login');
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
                    {isLogged === true ? <Button onClick={HandleLogout}>
                            Logout👋
                        </Button>
                    : null}
                </div>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;