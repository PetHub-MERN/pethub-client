import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const newUserData = {
            email,
            name,
            password
        };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, newUserData)
            .then(() => {
                setEmail("");
                setName("");
                setPassword("");
                navigate("/login");
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }

    return (
        <>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5
            }}>
                <Typography variant="h3">Create a New Account</Typography>

                <form>
                    <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                    }}>
                        <TextField variant="outlined" type="text" label="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} sx={{
                            mt: 3
                        }}/>
                        <TextField variant="outlined"  type="text" label="Username" value={name} onChange={(e) => {setName(e.target.value)}} sx={{
                            mt: 3
                        }}/>
                        <TextField variant="outlined"  type="password" label="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} sx={{
                            my: 3
                        }}/>
                        <Button onClick={handleSignupSubmit} variant="outlined">Sign Up</Button>
                    </Container>
                </form>

                {errorMessage &&
                    <Typography>{errorMessage}</Typography>
                }
            </Container>
            
        </>
    );
}

export default SignUpPage;