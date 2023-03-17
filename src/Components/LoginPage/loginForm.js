import {useNavigate} from "react-router";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./loginForm.css";

import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import {app} from "../Firebase/FirebaseConfig";
import {Navigate} from "react-router-dom";
// import {auth, firestore} from "../Firebase/FirebaseConfig";



//const navigate = useNavigate();
const LoginForm = () => {

    const auth = getAuth(app);

    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
   /* const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );*/
    //const users = [{username: "admin", password: "admin"}];
    const handleSubmit = (e) => {
        e.preventDefault();

        let email = e.target[0].value;
        let password = e.target[1].value;


        //TODO get email and password from login form
        signInWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                //Save user
                const user = userCredential.user;
                //TODO If "Stay logged in" set session length to month
                //TODO else session time one day/some hours
                console.log(user);
                navigate("/controlPanel");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode + "/n" + errorMessage);
                prompt(errorCode + "/n" + errorMessage);
            });

    };
    onAuthStateChanged(auth, (user) => {
        console.log("TEST")
        if (user) {
            console.log("Zalogowano")
            return <Navigate replace to="/ControlPanel"/>;
        }
        else {
            console.log("niezalogowano")
            // Somewhat good-looking bootstrap template for logging
        }
    });
    return (
        <div id="centering_id">
            <div id="rounded_login_form_container">
                <div id="login_header">
                    Login
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Username"
                            value={username} // Does it have to be {} instead ""?
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password} // Isn't that necessary?
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Stay logged in"/>
                    </Form.Group>

                    <div id="centering_id">
                        <Button variant="primary" type="submit">Login</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;