import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import petServices from "../services/pet.services";
import { Alert, AlertTitle, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";

const CreatePet = (props) => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { user } = useContext(AuthContext); 
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPet = {
            name,
            dateOfBirth,
            species,
            breed,
            description,
            owner: user._id
        };

        const addPet = () => {
            petServices.createPet(newPet)
                .then( response => {
                    petServices.getAllPets();
                    setName("");
                    setBreed("");
                    setDateOfBirth("");
                    setDescription("");
                    setSpecies("");
                    setErrorMessage(null);

                    props.callbackToUpdate();
                })
                .catch( err => {
                    setErrorMessage(err.response.data.message);
                }
            );
        }

        addPet();

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
                        <MenuItem value="Other">Fish</MenuItem>
                    </Select>
                    <TextField required fullWidth variant="outlined"  type="text" label="Breed" value={breed} onChange={(e) => {setBreed(e.target.value)}} sx={{
                        mt: 3
                    }}/>
                    <TextField multiline fullWidth variant="outlined"  type="text" label="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} sx={{
                        mt: 3,
                        mb: 5
                    }}/>

                    <Button sx={{mb: 3}} onClick={handleSubmit} variant="outlined">ADD YOUR PET!</Button>
                </Container>
            </form>
        );
    }

    return(
        <>
            <Typography variant="h3" sx={{
                m: 4
            }}>New <strong>Pet</strong></Typography>

            {renderForm()}

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }
            
        </>
    )

};  

export default CreatePet;