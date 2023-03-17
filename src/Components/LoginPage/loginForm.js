import {useNavigate} from "react-router";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./loginForm.css";

//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Firebase/FirebaseConfig";



//const navigate = useNavigate();
const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
   /* const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );*/
    //const users = [{username: "admin", password: "admin"}];
    const handleSubmit = (e) => {
        e.preventDefault();
        //const account = users.find((user) => user.username === username);
        /*if (account && account.password === password) {
            localStorage.setItem("authenticated", true);
            console.log(localStorage.getItem("authenticated"));
            navigate("/controlPanel");
        }*/

        //const auth = getAuth();
        //console.log(auth,username,password)
        auth.signInWithEmailAndPassword(username,password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("zalogowano")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    // Somewhat good-looking bootstrap template for logging
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