import {useNavigate} from "react-router";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//const navigate = useNavigate();
const LoginForm = () => {
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

    // We will have to connect those two returns somehow, so that the
    // resulting wil be compatible with the code above. Requires Paweł + Tytus cooperation.
    // return (
    //     <div>
    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 name="Username"
    //                 value={username}
    //                 onChange={(e) => setusername(e.target.value)}
    //             />
    //             <input
    //                 type="password"
    //                 name="Password"
    //                 onChange={(e) => setpassword(e.target.value)}
    //             />
    //             <input type="submit" value="Submit" />
    //         </form>
    //     </div>
    // );

    // Somewhat good-looking bootstrap template for logging (needs to be integrated further)
    return (
        <div id="centering_id">
            <Form>
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

                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;