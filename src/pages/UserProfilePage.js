import { Alert, AlertTitle, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import userServices from "../services/user.services";
import { AuthContext } from "../context/auth.context";
import AdoptionList from "../components/AdoptionList";
import PetList from "../components/PetList";
import adoptionServices from "../services/adoption.services";
import petServices from "../services/pet.services";
import registerAPetImage from '../assets/registerAPetHomePage.jpg';
import seeAllPetsImage from '../assets/seeAllPetsHomePage.jpg';
import createAdoptionImage from '../assets/createAdoptionHomePage.jpg';
import seeAdoptionsImage from '../assets/seeAdoptionsHomePage.jpg';
import EditProfile from "../components/EditProfile";

function UserProfilePage() {

    const [contentOption, setContentOption] = useState("profile");

    const [pets, setPets] = useState(null);
    const [adoptions, setAdoptions] = useState(null);

    const [userFromDb, setUserFromDb] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { user, logOutUser } = useContext(AuthContext);

    const getUserFromDB = () => {
        userServices.getUser(user._id)
            .then((response) => {
                setUserFromDb(response.data);
                setContentOption("profile");
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);

                if(err.response.data.message === "Session Expired") {
                    logOutUser();
                }
            }
        );
    }
    
    useEffect(() => {
        getUserFromDB();    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderContent = () => {

        switch(contentOption) {
            
            case "profile":
                return (
                    <>
                        {userFromDb ? 
                            <Box sx={{
                                display: "flex", 
                                justifyContent:"center", 
                                alignContent: "center",
                                marginTop: "5%"
                            }}>
                                <Paper elevation={3} sx={{maxWidth:"50%", padding:"20px"}}>
                                    <Box sx={{ width: {xs: '200px', xl: '400px'}, height: {xs: '200px', xl: '400px'}, backgroundImage: `url(${userFromDb.imageUrl})`, backgroundSize: 'cover', borderRadius: '50%' }}/>
                                    <Typography variant="h4">{userFromDb.name}</Typography>
                                    <Typography variant="h5">{userFromDb.email}</Typography>
                                    <Button variant="contained" sx={{m:2}} onClick={() => {setContentOption("edit")}}>EDIT PIC</Button>
                                </Paper>
                            </Box>
                            :
                            <CircularProgress />
                        }
                    </>
                );
            
            case "adoptions":
                return (
                    <AdoptionList functionToGetResources={getAllAdoptions} resource={adoptions} errorMessage={errorMessage} isProfilePage/>
                );

            case "pets":
                return (
                    <PetList functionToGetResources={getAllPets} resource={pets} errorMessage={errorMessage} isProfilePage/>
                );
                
            case "edit":
                return <EditProfile errorMessage={errorMessage} callbackToUpdateUser={() => {getUserFromDB()}}/>

            default:
                console.log("Invalid Option");
        }
    }

    const handleSelection = (option) => {
        setContentOption(option);
    }

    const getAllAdoptions = () => {
        adoptionServices.getAllAdoptions()
            .then((response) => {
                const myAdoptions = response.data.filter(adoption => adoption.announcer._id === user._id);
                setAdoptions(myAdoptions);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }

    const getAllPets = () => {
        petServices.getAllPets()
            .then( response => {
                const myPets = response.data.filter(pet => pet.owner._id === user._id);
                setPets(myPets);
            })
            .catch( err => {
                console.log(err);
            }
        );
    }

    return (
        <>
            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            <Box sx={{
                display: "flex",
                flexDirection: {xs: "column-reverse", md: "row"}
            }}>
                <Box sx={{
                    flex: 3,
                    borderRight: {xs: "none", md: "1px solid rgba(77, 77, 77, 0.5)"},
                    borderTop: {xs: "1px solid rgba(77, 77, 77, 0.5)", md: "none"},
                    height: "80vh",
                    overflow: "auto",
                }}>
                    {renderContent()}
                </Box>

                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: {xs: "row", md: "column"},
                    height: {xs: "15vh", md: "80vh"}
                }}>

                    <Box sx={{
                        flex: 1,
                        display: "flex", 
                        flexDirection: {xs:"column", sm: "row", md: "column"},
                    }}>        
                        <Box 
                            sx={{
                                backgroundImage:`url(${registerAPetImage})`, 
                                backgroundSize:"cover", 
                                flex: 1,
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center", 
                                alignItems:"center",
                                transition: "opacity .2s ease-in-out",
                                minHeight: {sm: "100px", xs: "50px"},
                                "&:hover": {
                                    opacity: 0.8,
                                    cursor: "pointer"
                                }      
                            }}

                            onClick={() => {handleSelection("pets")}}
                        >
                            <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom: {xs: "0", xl: "5px"}, fontSize: {xs: "3vw", md:"2em"}}} variant="h4">Your <strong>Pets</strong>!</Typography>
                        </Box>

                        <Box 
                            sx={{
                                backgroundImage:`url(${seeAllPetsImage})`, 
                                backgroundSize:"cover",
                                flex: 1,
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center", 
                                alignItems:"center",
                                transition: "opacity .2s ease-in-out",
                                minHeight: {sm: "100px", xs: "50px"},
                                "&:hover": {
                                    opacity: 0.8,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => {handleSelection("adoptions")}}
                        >
                            <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom: {xs: "0", xl: "5px"}, fontSize: {xs: "3vw", md:"2em"}}} variant="h4">Your <strong>Adoptions</strong>!</Typography>
                        </Box>

                    </Box>

                    <Box sx={{
                        flex: 1,
                        display: "flex", 
                        flexDirection: {xs:"column", sm: "row", md: "column"},
                    }}>
                        <Box 
                            sx={{
                                backgroundImage:`url(${createAdoptionImage})`, 
                                backgroundSize:"cover", 
                                flex: 1,
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center", 
                                alignItems:"center",
                                transition: "opacity .2s ease-in-out",
                                minHeight: {sm: "100px", xs: "50px"},
                                "&:hover": {
                                    opacity: 0.8,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => {handleSelection("profile")}}
                        >
                            <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom: {xs: "0", xl: "5px"}, fontSize: {xs: "3vw", md:"2em"}}} variant="h4">Your <strong>Profile</strong>!</Typography>
                        </Box>

                        <Box 
                            sx={{
                                backgroundImage:`url(${seeAdoptionsImage})`, 
                                backgroundSize:"cover", 
                                flex: 1,
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center", 
                                alignItems:"center",
                                transition: "opacity .2s ease-in-out",
                                minHeight: {sm: "100px", xs: "50px"},
                                "&:hover": {
                                    opacity: 0.8,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => {handleSelection("edit")}}
                        >
                            <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom: {xs: "0", xl: "5px"}, fontSize: {xs: "3vw", md:"2em"}}} variant="h4">Edit <strong>Photo</strong>!</Typography>
                        </Box>
                    </Box>                    
                </Box>
            </Box>
        </>
    );
}

export default UserProfilePage;