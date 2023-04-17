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
    const { user } = useContext(AuthContext);

    const getUserFromDB = () => {
        userServices.getUser(user._id)
            .then((response) => {
                setUserFromDb(response.data);
                setContentOption("profile");
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
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
                                marginTop: "1%"
                            }}>
                                <Paper elevation={3} sx={{maxWidth:"50%"}}>
                                    <img src={userFromDb.imageUrl} alt={userFromDb.name} style={{maxWidth: "10vw", margin: "1em", borderRadius: "50%"}}/>
                                    <Typography variant="h4">{userFromDb.name}</Typography>
                                    <Typography variant="h5">{userFromDb.email}</Typography>
                                    <Button variant="contained" sx={{m:2}}>EDIT</Button>
                                </Paper>
                            </Box>
                            :
                            <CircularProgress />
                        }
                    </>
                );
            
            case "adoptions":
                return (
                    <AdoptionList functionToGetResources={getAllAdoptions} resource={adoptions} errorMessage={errorMessage}/>
                );

            case "pets":
                return (
                    <PetList functionToGetResources={getAllPets} resource={pets} errorMessage={errorMessage}/>
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
                setAdoptions(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }

    const getAllPets = () => {
        petServices.getAllPets()
            .then( response => {
                setPets(response.data);
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
                    flexDirection: {xs: "row", md: "column"}
                }}>
                    <Box sx={{
                        backgroundImage:`url(${registerAPetImage})`, 
                        backgroundSize:"cover", 
                        height:"25%", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems:"center", 
                        transition: "opacity .2s ease-in-out",
                        "&:hover": {
                            opacity: 0.8
                        }
                    }}>
                        <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom:"5px"}} variant="h4">See your <strong>Pets</strong>!</Typography>
                        <Button variant="contained" onClick={() => {handleSelection("adoptions")}}>YOUR ADOPTIONS</Button>
                    </Box>
                    <Box sx={{
                        backgroundImage:`url(${seeAllPetsImage})`, 
                        backgroundSize:"cover", 
                        height:"25%", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems:"center",
                        transition: "opacity .2s ease-in-out",
                        "&:hover": {
                            opacity: 0.8
                        }
                    }}>
                        <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom:"5px"}} variant="h4">See your <strong>Adoptions</strong>!</Typography>
                        <Button variant="contained" onClick={() => {handleSelection("pets")}}>YOUR PETS</Button>
                    </Box>
                    <Box sx={{
                        backgroundImage:`url(${createAdoptionImage})`, 
                        backgroundSize:"cover", 
                        height:"25%", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems:"center",
                        transition: "opacity .2s ease-in-out",
                        "&:hover": {
                            opacity: 0.8
                        }
                    }}>
                        <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom:"5px"}} variant="h4">See your <strong>Profile</strong>!</Typography>
                        <Button variant="contained" onClick={() => {handleSelection("profile")}}>YOUR PROFILE</Button>
                    </Box>
                    <Box sx={{
                        backgroundImage:`url(${seeAdoptionsImage})`, 
                        backgroundSize:"cover", 
                        height:"25%", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems:"center",
                        transition: "opacity .2s ease-in-out",
                        "&:hover": {
                            opacity: 0.8
                        }
                    }}>
                        <Typography sx={{backgroundColor:"rgba(51, 51, 51, 0.7)", color:"white", borderRadius:"10px", padding: "5px", marginBottom:"5px"}} variant="h4">Edit your <strong>Profile</strong>!</Typography>
                        <Button variant="contained" onClick={() => {handleSelection("edit")}}>EDIT PROFILE</Button>
                    </Box>
                </Box>
            </Box>


        </>
    );
}

export default UserProfilePage;