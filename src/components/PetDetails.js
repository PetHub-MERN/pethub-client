import { useNavigate } from "react-router-dom";
import petServices from "../services/pet.services";
import { useEffect } from "react";
import { Alert, AlertTitle, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import IsOwner from "./IsOwner";

function PetDetails(props) {

    const {resource: pet, resourceId: petId, errorMessage} = props;

    const navigate = useNavigate();

    useEffect( () => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                alignItems:"center",
                m: 5
            }}> 
                
                <Card sx={{ maxWidth: "60%",
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
                        <Typography sx={{fontSize:"2.2rem", wordBreak: "break-word"}} variant="h4">{pet.name}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Date of Birth:</strong> {pet.dateOfBirth.split('T')[0]}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Species:</strong> {pet.species}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Breed:</strong> {pet.breed}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Description:</strong> {pet.description}</Typography>
                    </CardContent>

                    <IsOwner>
                        <CardActions sx={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                            <Button onClick={() => {handleDeleteClick()}} size="large" variant="contained" color="error">DELETE</Button>
                        </CardActions>
                    </IsOwner>
                </Card>
                
            </Box>
        );
    }

    return (
        <>
            <Typography sx={{ typography: { sm: 'h4', xs: 'h4', md: "h3" } }} variant="h2" marginTop={4}>🦊 <strong>{pet ? pet.name : <CircularProgress /> }</strong> 🐯</Typography>

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
                <CircularProgress />
            }
        </>
    );
}

export default PetDetails;