import { AppBar, Box, Container, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { Link } from "react-router-dom";

function Navbar() {
    return(
        <AppBar sx={{
            position: "static",
            p: 1,
            display: "flex",
            flexDirection:"row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Link to={"/"}>
                    <Typography variant="h3" sx={{
                        display: {xs: "none", md: "block"}
                    }}>The PetHub</Typography>
                </Link>
                <PetsIcon sx={{ml: 1, fontSize: "3em"}}/>
            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Link to={"/login"}>
                    <Typography variant="h5" sx={{
                        m: 1   
                    }}>LogIn</Typography>
                </Link>

                <Link to={"/signup"}>
                    <Typography variant="h5" sx={{
                        m: 1   
                    }}>SignUp</Typography>
                </Link>
            </Box>
        </AppBar>
    );
}

export default Navbar;