import { Alert, AlertTitle, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.services";

function SignUpForm(props) {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const {isDedicatedPage ,setWelcomeContent} = props;

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const newUserData = {
            email,
            name,
            password
        };

        authService.signUp(newUserData)
            .then(() => {
                setEmail("");
                setName("");
                setPassword("");

                if(isDedicatedPage) {
                    navigate("/login");
                } else {
                    setWelcomeContent("login");
                }

            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }

    return (
        <>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 3
            }}>
                <Typography variant="h3">Sign Up</Typography>

                {errorMessage &&
                    <Alert align="left" severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                }

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
                        <Button variant="contained" onClick={handleSignupSubmit}>Sign Up</Button>
                    </Container>
                </form>

            </Container>

            {isDedicatedPage ? 
                 <Typography>Already have an Account? <Button variant= "text" onClick={() => {navigate("/login")}}>LogIn</Button></Typography>
                 :
                 <Typography>Already have an Account? <Button variant="text" onClick={() => {setWelcomeContent("login")}}>LogIn</Button></Typography>
            }
            
        </>
    );
}

export default SignUpForm;