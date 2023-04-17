import { useNavigate } from "react-router-dom";
import petServices from "../services/pet.services";
import { useEffect } from "react";
import { Alert, AlertTitle, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import IsOwner from "./IsOwner";

function PetDetails(props) {

    const {resource: pet, resourceId: petId, errorMessage} = props;

    const navigate = useNavigate();

    useEffect( () => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditClick = () => {
        navigate(`/pets/edit/${petId}`)
    };

    const handleDeleteClick = () => {
        petServices.deletePet(petId)
            .then( response => {
                navigate('/pets')
            })
            .catch( err => {
                console.error('Failed deleting')
            })
    }

    const renderPetDetails = () => {
        return (
            <Box 
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md:"row"},
                justifyContent: "center",
                m: 5
            }}> 
                
                <Card sx={{ maxWidth: "50%",
                            flexGrow: 1 }}
                >
                    <CardHeader 
                        align="left"
                        avatar={<Avatar src={pet.owner.imageUrl}></Avatar>}
                        title={pet.owner.name}
                        subheader="Owner"
                    />
                    <CardMedia 
                        sx={{ height:"300px" }}
                        image={pet.imageUrl}
                        title={pet.name}
                    />
                    <CardContent>
                        <Typography variant="h3">{pet.name}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Date of Birth:</strong> {pet.dateOfBirth.split('T')[0]}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Species:</strong> {pet.species}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Breed:</strong> {pet.breed}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Description:</strong> {pet.description}</Typography>
                    </CardContent>

                    <IsOwner>
                        <CardActions sx={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                            <Button onClick={() => {handleEditClick()}} size="large" variant="contained">EDIT</Button>
                            <Button onClick={() => {handleDeleteClick()}} size="large" variant="contained" color="error">DELETE</Button>
                        </CardActions>
                    </IsOwner>
                </Card>
                
            </Box>
        );
    }

    return (
        <>
            <Typography variant="h2" marginTop={4}>🦊 <strong>{pet ? pet.name : "Loading..."}</strong> 🐯</Typography>

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {pet ?
                <>
                    {renderPetDetails()}
                </>
                :
                <Typography variant="h3">Loading...</Typography>
            }
        </>
    );
}

export default PetDetails;