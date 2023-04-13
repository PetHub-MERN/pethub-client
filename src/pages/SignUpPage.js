import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Email: " + email);
        console.log("Username: " + username);
        console.log("Password: " + password);

        navigate("/")
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
                        <TextField variant="outlined"  type="text" label="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} sx={{
                            mt: 3
                        }}/>
                        <TextField variant="outlined"  type="password" label="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} sx={{
                            my: 3
                        }}/>
                        <Button onClick={handleSignupSubmit} variant="outlined">Sign Up</Button>
                    </Container>
                </form>
            </Container>
            
        </>
    );
}

export default SignUpPage;