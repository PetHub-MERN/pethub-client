import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PetListPage = () => {

    const [pets, setPets] = useState(null);

    const navigate = useNavigate();

    const handleClickDetails = (petId) => {
        navigate(`/pets/${petId}`);
    }

    const getAllPets = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/pets`)
            .then( response => {
                setPets(response.data);
            })
            .catch( err => {
                console.log(err);
            }
        );
    }

    useEffect( () => {
        getAllPets();
    }, []);

    return(
        <>
            <Typography variant="h2" sx={{marginTop:"40px"}}>
                    List of <strong>Pets</strong>
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: {xs: "column", md:"row"},
                justifyContent: "center",
                flexWrap: "wrap",
                m: 5
            }}>
                {pets && 
                    pets.map( pet => {
                        return(
                            <Card 
                                sx={{ 
                                    maxWidth: 345,
                                    m: 2,
                                    flexGrow: 1
                                }}>
                                <CardMedia 
                                    sx={{ height: 140 }}
                                    image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                                    title={pet.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {pet.name}
                                    </Typography>
                                    <Chip sx={{m:1}} label={pet.species} color="warning" />
                                    <Chip sx={{m:1}} label={pet.breed} color="warning" />
                                    <Chip sx={{m:1}} label={pet.dateOfBirth.split('T')[0]} color="warning" />
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" onClick={() => {handleClickDetails(pet._id)}}>LEARN MORE</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Box>
        </>
    )

};

export default PetListPage;