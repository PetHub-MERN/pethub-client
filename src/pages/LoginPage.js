import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext); 

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        
        const loginData = {
            email,
            password
        };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData)
            .then((response) => {
                storeToken(response.data.authToken);
                authenticateUser();
                navigate("/");
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

                {errorMessage && <Typography>{errorMessage}</Typography>}
            </Container>
            
        </>
    );
}

export default LoginPage;