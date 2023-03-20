import {useNavigate} from "react-router";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./singinForm.css";

//const navigate = useNavigate();
const SinginForm = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    const users = [{username: "admin", password: "admin"}];
    const handleSubmit = (e) => {
        e.preventDefault();
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            localStorage.setItem("authenticated", true);
            console.log(localStorage.getItem("authenticated"));
            navigate("/controlPanel");
        }
    };

    // Somewhat good-looking bootstrap template for logging
    return (
        <div id="centering_id">
            <div id="rounded_login_form_container">
                <div id="login_header">
                    SingIn
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



                    <div id="centering_id">
                        <Button variant="primary" type="submit">Singin</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SinginForm;