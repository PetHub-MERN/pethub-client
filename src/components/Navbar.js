import { AppBar, Box, Menu, MenuItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import PetsIcon from "@mui/icons-material/Pets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';


function Navbar() {

    const {isLoggedIn, logOutUser} = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = (option) => {
        
        if(option !== "logout"){
            navigate(`/${option}`);
        } else {
            logOutUser();
            navigate("/");
        }
    }

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return(
        <AppBar sx={{
            position: "static",
            p: 1,
            display: "flex",
            flexDirection:"row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "10vh"
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
                <>
                    <Box sx={{
                        display: { xs:"none", sm:"flex"},
                        alignItems: "center",
                        marginRight: "10px",
                    }}>
                        <Button sx={{color: "black", borderColor:"black", marginRight:"20px"}} variant="outlined" startIcon={<LoginIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("login")}}>
                            LOGIN
                        </Button>

                        <Button sx={{color:"black", borderColor:"black"}} variant="outlined" startIcon={<PersonAddIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("signup")}}>
                            SIGNUP
                        </Button>
                    </Box>

                    <Box sx={{
                        display: { xs:"block", sm:"none"},
                        alignItems: "center",
                        marginRight: "10px",
                    }}>
                        <MenuIcon 
                            sx={{
                                display: {xs: "block", md: "none"},
                                ml: 1, 
                                fontSize: "3em"
                            }}
                            onClick={handleMenuClick}
                        />

                        <Menu
                            anchorEl={anchorEl}
                            open={anchorEl ? true : false}
                            onClose={() => setAnchorEl(null)}
                            onClick={() => setAnchorEl(null)}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            
                        >

                            <MenuItem>
                                <Button sx={{color: "black", borderColor:"black", marginRight:"20px"}} variant="text" startIcon={<LoginIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("login")}}>
                                    LOGIN
                                </Button>
                            </MenuItem>

                            <MenuItem>
                                <Button sx={{color:"black", borderColor:"black"}} variant="text" startIcon={<PersonAddIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("signup")}}>
                                    SIGNUP
                                </Button>
                            </MenuItem>

                        </Menu>

                    </Box>
                </>
            }

            {isLoggedIn &&

                <>
                    <Box sx={{
                        display: { xs:"none", sm:"flex"},
                        alignItems: "center",
                        marginRight: "10px"
                    }}>

                        <NavLink exact to={"/user-profile"} isActive={() => location.pathname === "/"} className="nav-link">
                            MY PROFILE
                        </NavLink>

                        <NavLink exact to={"/pets"} isActive={() => location.pathname === "/pets"} className="nav-link">
                            PETS
                        </NavLink>

                        <NavLink exact to={"/adoptions"} isActive={() => location.pathname === "/adoptions"} className="nav-link">
                            ADOPTIONS
                        </NavLink>

                        <Button sx={{color: "black", borderColor:"black", mx: 3}} variant="outlined" startIcon={<LogoutIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("logout")}}>
                            LOGOUT
                        </Button>
                    </Box>

                    <Box sx={{
                        display: { xs:"block", sm:"none"},
                        alignItems: "center",
                        marginRight: "10px",
                    }}>
                        <MenuIcon 
                            sx={{
                                display: {xs: "block", md: "none"},
                                ml: 1, 
                                fontSize: "3em"
                            }}
                            onClick={handleMenuClick}
                        />

                        <Menu
                            anchorEl={anchorEl}
                            open={anchorEl ? true : false}
                            onClose={() => setAnchorEl(null)}
                            onClick={() => setAnchorEl(null)}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >

                            <MenuItem>
                                <NavLink exact to={"/user-profile"} isActive={() => location.pathname === "/"} className="nav-link">
                                    MY PROFILE
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <NavLink exact to={"/pets"} isActive={() => location.pathname === "/pets"} className="nav-link">
                                    PETS
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <NavLink exact to={"/adoptions"} isActive={() => location.pathname === "/adoptions"} className="nav-link">
                                    ADOPTIONS
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <Button sx={{color: "black", borderColor:"black", mx: 3}} variant="text" startIcon={<LogoutIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("logout")}}>
                                    LOGOUT
                                </Button>
                            </MenuItem>

                        </Menu>

                    </Box>
                </>

            }
        </AppBar>
    );
}

export default Navbar;