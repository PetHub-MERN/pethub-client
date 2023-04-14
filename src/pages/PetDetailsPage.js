import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import petServices from "../services/pet.services";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

const PetDetailsPage = () => {

    const navigate = useNavigate();

    const [pet, setPet] = useState(null);

    const { petId } = useParams();

    const getPetDetails = () => {
        petServices.getPet(petId)
            .then( response => {
                console.log(response.data);
                setPet(response.data);
            })
            .catch( err => {
                console.log(err);
            }
        );
    }

    useEffect( () => {
        getPetDetails();
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

    return (
        <Box 
        sx={{
            display: "flex",
            flexDirection: {xs: "column", md:"row"},
            justifyContent: "center",
            m: 5
        }}> 
            {pet &&
                <Card sx={{ maxWidth: "50%",
                            flexGrow: 1 }}
                >
                    <CardHeader 
                        align="left"
                        avatar={<Avatar>{pet.owner.name.charAt(0)}</Avatar>}
                        title={pet.owner.name}
                        subheader="Owner"
                    />
                    <CardMedia 
                        sx={{ height:"300px" }}
                        image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                        title={pet.name}
                    />
                    <CardContent>
                        <Typography variant="h3">{pet.name}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Date of Birth:</strong> {pet.dateOfBirth.split('T')[0]}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Species:</strong> {pet.species}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Breed:</strong> {pet.breed}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Description:</strong> {pet.description}</Typography>
                    </CardContent>
                    <CardActions sx={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                        <Button onClick={() => {handleEditClick()}} size="large" variant="contained">EDIT</Button>
                        <Button onClick={() => {handleDeleteClick()}} size="large" variant="contained" color="error">DELETE</Button>
                    </CardActions>
                </Card>
            }
        </Box>
    )

};

export default PetDetailsPage;