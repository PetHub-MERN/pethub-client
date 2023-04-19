import { useEffect, useState } from "react";
import petServices from "../services/pet.services";
import { Alert, AlertTitle, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditPet = (props) => {

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const {isDedicatedPage, callbackToUpdate, callbackToCloseForm} = props;

    const navigate = useNavigate();

    const {petId} = useParams();

    useEffect(() => {

        petServices.getPet(petId)
            .then((response) => {
                const pet = response.data;

                setName(pet.name);
                setDateOfBirth(pet.dateOfBirth);
                setDescription(pet.description);
                setBreed(pet.breed);
                setSpecies(pet.species);

            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPet = {
            name,
            dateOfBirth,
            species,
            breed,
            description,
        };


        petServices.editPet(petId, updatedPet)
            .then( response => {
                setErrorMessage(null);

                if(isDedicatedPage) {
                    navigate(`/pets/${petId}`);
                } else {
                    callbackToUpdate();
                }
            })
            .catch( err => {
                setErrorMessage(err.response.data.message);
            }
        );
        

    }

    const renderForm = () => {
        return(
            <form>
                <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "inherit"
                }}>
                    <TextField required fullWidth variant="outlined" type="text" label="Name" value={name} onChange={(e) => {setName(e.target.value)}} sx={{
                        mt: 3
                    }}/>
                    <TextField required fullWidth variant="outlined"  type="date" helperText="Date of Birth" value={dateOfBirth} onChange={(e) => {setDateOfBirth(e.target.value)}} sx={{
                        mt: 3
                    }}/>
                    <Select 
                        align="left"
                        fullWidth
                        value={species}
                        onChange={(e) => {setSpecies(e.target.value)}}
                        sx={{mt: 1}}
                    >
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Bird">Bird</MenuItem>
                        <MenuItem value="Reptile">Reptile</MenuItem>
                        <MenuItem value="Fish">Fish</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <TextField required fullWidth variant="outlined"  type="text" label="Breed" value={breed} onChange={(e) => {setBreed(e.target.value)}} sx={{
                        mt: 3
                    }}/>
                    <TextField multiline fullWidth variant="outlined"  type="text" label="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} sx={{
                        mt: 3,
                        mb: 5
                    }}/>

                    <Button sx={{mb: 3}} onClick={handleSubmit} variant="outlined">EDIT PET!</Button>
                </Container>
            </form>
        );
    }

    return(
        <>
            <Typography variant="h3" sx={{
                m: 4
            }}>Edit <strong>Pet</strong></Typography>

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {renderForm()}

            {isDedicatedPage ?
                <Button
                    variant="text"
                    sx={{mb: 3}}
                    onClick={() => {navigate(-1)}}
                >RETURN</Button>
                :
                <Button
                    variant="text"
                    sx={{mb: 3}}
                    onClick={callbackToCloseForm}
                >Hide Form</Button>            
            }

        </>
    )

};  

export default EditPet;