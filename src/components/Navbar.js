import { AppBar, Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import PetsIcon from "@mui/icons-material/Pets";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function Navbar() {

    const {isLoggedIn, isLoading, logOutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleButtonClick = (option) => {
        
        if(option !== "logout"){
            navigate(`/${option}`);
        } else {
            logOutUser();
            navigate("/");
        }

    }

    return(
        <AppBar sx={{
            position: "static",
            p: 1,
            display: "flex",
            flexDirection:"row",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "10vh"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Link to={"/"}>
                    <Typography variant="h3" sx={{
                        display: {xs: "none", md: "block"}
                    }}>🐶 <strong>Pet</strong>Hub 😺</Typography>
                </Link>

                <Link to={"/"}>
                    <PetsIcon sx={{
                        display: {xs: "block", md: "none"},
                        ml: 1, 
                        fontSize: "3em"
                    }}/>
                </Link>
            </Box>

            {!isLoggedIn && 
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px"
                }}>
                    <Button sx={{color: "black", borderColor:"black", marginRight:"20px"}} variant="outlined" startIcon={<LoginIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("login")}}>
                    LOGIN
                    </Button>

                    <Button sx={{color:"black", borderColor:"black"}} variant="outlined" startIcon={<PersonAddIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("signup")}}>
                    SIGNUP
                    </Button>
                </Box>
            }

            {isLoggedIn &&
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px"
                }}>
                    <Button sx={{color: "black", borderColor:"black", marginRight:"20px"}} variant="outlined" startIcon={<LogoutIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("logout")}}>
                    LOGOUT
                    </Button>
                </Box>
            }
        </AppBar>
    );
}

export default Navbar;