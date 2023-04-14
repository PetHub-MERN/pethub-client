import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import petServices from "../services/pet.services";
import { Alert, AlertTitle, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";

const PetEditPage = () => {

    const navigate = useNavigate();

    const [pet, setPet] = useState('null');
    const [name, setName] = useState(pet.name);
    const [species, setSpecies] = useState(pet.species);
    const [breed, setBreed] = useState(pet.breed);
    const [description, setDescription] = useState(pet.description);
    const [errorMessage, setErrorMessage] = useState(null);

    const { petId } = useParams();

    ( function () {
        petServices.getPet(petId)
            .then( petInfo => {
                setPet(petInfo.data);
            })
            .catch( err => {
                console.error(err);
            }
        );
    })();

    const handleSubmit = e => {
        e.preventDefault();

        const updatedPetInfo = {
            name: name !== '' ? name : pet.name,
            species: species !== '' ? species : pet.species,
            breed: breed !== '' ? breed : pet.breed,
            description: description !== '' ? description : pet.description
        }

        const editPetDetails = () => {
            petServices.editPet(petId, updatedPetInfo)
                .then(response => {
                    setPet(response.data);
                    petServices.getAllPets();
                    navigate(`/pets/${petId}`);
                })
                .catch(err => {
                    console.log(err);
                }
            );
        }

        editPetDetails();

    }

    return(
        <>
            {pet &&
                <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 5,
                }}>
                    <Typography variant="h3">🦊 Add a new pet 🐯</Typography>

                    <form>
                        <Container sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "500px"
                        }}>
                            <TextField required fullWidth variant="outlined" type="text" label={pet.name} value={name} placeholder="New name..." onChange={(e) => { setName(e.target.value) }} sx={{
                                mt: 3
                            }} />
                            <Select
                                align="left"
                                fullWidth
                                value={pet.species}
                                onChange={(e) => { setSpecies(e.target.value) }}
                                sx={{ mt: 3 }}
                                placeholder={pet.species}
                            >
                                <MenuItem value="Dog">Dog</MenuItem>
                                <MenuItem value="Cat">Cat</MenuItem>
                                <MenuItem value="Bird">Bird</MenuItem>
                                <MenuItem value="Reptile">Reptile</MenuItem>
                                <MenuItem value="Fish">Fish</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            <TextField required fullWidth variant="outlined" type="text" label={pet.breed} value={breed} onChange={(e) => { setBreed(e.target.value) }} sx={{
                                mt: 3
                            }} />
                            <TextField multiline fullWidth variant="outlined" type="text" label={pet.description} value={description} onChange={(e) => { setDescription(e.target.value) }} sx={{
                                mt: 3,
                                mb: 5
                            }} />

                            <Button sx={{ mb: 3 }} onClick={handleSubmit} variant="outlined">EDIT INFO</Button>
                        </Container>
                    </form>

                    {errorMessage &&
                        <Alert align="left" severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {errorMessage}
                        </Alert>
                    }
                </Container>
            }
        </>
    )

};

export default PetEditPage;