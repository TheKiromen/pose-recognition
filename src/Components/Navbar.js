import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import "../Components/navbarStyle.css";

import { getAuth, signOut} from "firebase/auth";
import {useUserAuth} from "./MonitorAuth";


const MainNavbar = () => {
    //Preparation of the code for further operation
    const logged = useUserAuth();

    const HandleLogout = () => {
        console.log("logout");
        //localStorage.setItem("authenticated", false)
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            <Link to="/login"/>
        }).catch((error) => {
            // An error happened.
        });


    };
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/"><Button >Pose Recognition</Button></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="singin">Singin</Nav.Link>*/}
                        <Link to="/controlPanel"><Button >Control Panel</Button></Link>
                    </Nav>
                </Navbar.Collapse>
                {/*TODO Move to control panel*/}
                {logged ? <div className="badge bg-success text-wrap"> Hello {logged.email} </div> : null }
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