import { AppBar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import PetsIcon from "@mui/icons-material/Pets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar({ toggleDark, changeMode }) {

    const { isLoggedIn, logOutUser } = useContext(AuthContext);

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
                        display: {xs: "none", lg: "block"}
                    }}>🐶 <strong>Pet</strong>Hub 😺</Typography>
                </Link>

                <Link to={"/"}>
                    <PetsIcon sx={{
                        display: {xs: "block", lg: "none"},
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
                        <IconButton 
                            sx={{m:2}}
                            onClick={() => changeMode()} 
                            color="inherit"
                        >
                            {toggleDark ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>

                        <Button sx={{color: "black", borderColor:"black", marginRight:"20px"}} variant={toggleDark ? 'contained' : 'outlined'} startIcon={<LoginIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("login")}}>
                            LOGIN
                        </Button>

                        <Button sx={{color: "black", borderColor:"black"}} variant={toggleDark ? 'contained' : 'outlined'} startIcon={<PersonAddIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("signup")}}>
                            SIGNUP
                        </Button>
                    </Box>

                    <Box sx={{
                        display: { xs:"flex", sm:"none"},
                        alignItems: "center",
                        marginRight: "10px",
                    }}>
                        <IconButton 
                            onClick={() => changeMode()} 
                            color="inherit"
                        >
                            {toggleDark ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>

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
                                <Button sx={{color: toggleDark ? "white" : "black", borderColor:"black", marginRight:"20px"}} variant="text" startIcon={<LoginIcon sx={{color: toggleDark ? "white" : "black"}}/>} onClick={() => {handleButtonClick("login")}}>
                                    LOGIN
                                </Button>
                            </MenuItem>

                            <MenuItem>
                                <Button sx={{color:toggleDark ? "white" : "black", borderColor:"black"}} variant="text" startIcon={<PersonAddIcon sx={{color: toggleDark ? "white" : "black"}}/>} onClick={() => {handleButtonClick("signup")}}>
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
                        display: { xs:"none", md:"flex"},
                        alignItems: "center",
                        marginRight: "10px"
                    }}>
                        <IconButton 
                            sx={{
                                
                            }} 
                            onClick={() => changeMode()} 
                            color="inherit"
                        >
                            {toggleDark ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>

                        <NavLink exact to={"/user-profile"} isActive={() => location.pathname === "/"} className="nav-link">
                            MY PROFILE
                        </NavLink>

                        <NavLink exact to={"/pets"} isActive={() => location.pathname === "/pets"} className="nav-link">
                            PETS
                        </NavLink>

                        <NavLink exact to={"/adoptions"} isActive={() => location.pathname === "/adoptions"} className="nav-link">
                            ADOPTIONS
                        </NavLink>

                        <NavLink exact to={"/chat"} isActive={() => location.pathname === "/chat"} className="nav-link">
                            CHAT
                        </NavLink>

                        <Button sx={{color: "black", borderColor:"black", mx: 3}} variant={toggleDark ? 'contained' : 'outlined'} startIcon={<LogoutIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("logout")}}>
                            LOGOUT
                        </Button>
                    </Box>

                    <Box sx={{
                        display: { xs:"flex", md:"none"},
                        alignItems: "center",
                        marginRight: "10px",
                    }}>
                        <IconButton 
                            sx={{
                                m:2
                            }} 
                            onClick={() => changeMode()} 
                            color="inherit"
                        >
                            {toggleDark ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>

                        <MenuIcon 
                            sx={{
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
                                <NavLink exact to={"/chat"} isActive={() => location.pathname === "/chat"} className="nav-link">
                                    CHAT
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <Button sx={{color: "black", borderColor:"black", mx: 3}} variant={toggleDark ? 'contained' : 'outlined'} startIcon={<LogoutIcon sx={{color: "inherit"}}/>} onClick={() => {handleButtonClick("logout")}}>
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