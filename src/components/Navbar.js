import { AppBar, Box, Typography } from "@mui/material";
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
                    }}>Log In</Typography>
                </Link>

                <Link to={"/signup"}>
                    <Typography variant="h5" sx={{
                        my: 1   
                    }}>Sign Up</Typography>
                </Link>
            </Box>
        </AppBar>
    );
}

export default Navbar;