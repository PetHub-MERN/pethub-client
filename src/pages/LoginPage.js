import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Email: " + email);
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
                <Typography variant="h3">Log In</Typography>

                <form>
                    <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                    }}>
                        <TextField variant="outlined" type="text" label="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} sx={{
                            mt: 3
                        }}/>
                        <TextField variant="outlined"  type="password" label="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} sx={{
                            m: 3
                        }}/>
                        <Button onClick={handleLoginSubmit} variant="outlined">LogIn</Button>
                    </Container>
                </form>
            </Container>
            
        </>
    );
}

export default LoginPage;