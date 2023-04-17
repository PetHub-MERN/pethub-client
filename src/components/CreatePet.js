import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import petServices from "../services/pet.services";
import { Alert, AlertTitle, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import imageServices from "../services/image.services";

const CreatePet = (props) => {

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);
    const [isUrlReady, setIsUrlReady] = useState(true);

    const { user } = useContext(AuthContext); 
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isUrlReady) {

            const newPet = {
                name,
                dateOfBirth,
                species,
                breed,
                description,
                imageUrl,
                owner: user._id
            };
    
            petServices.createPet(newPet)
                .then( response => {
                    petServices.getAllPets();
                    setName("");
                    setBreed("");
                    setDateOfBirth("");
                    setDescription("");
                    setSpecies("");
                    setImageUrl(null)
                    setErrorMessage(null);

                    props.callbackToUpdate();
                })
                .catch( err => {
                    setErrorMessage(err.response.data.message);
                }
            );
        } else {
            setErrorMessage("Image is Loading!")
        }
    }

    const handleFileUpload = (e) => {

        setIsUrlReady(false);

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        imageServices.uploadImage(uploadData)
            .then( response => {
                setImageUrl(response.data.fileUrl);
                setIsUrlReady(true);
            })
            .catch(err => {
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

                    <input type="file" name="imageUrl" onChange={(e) => handleFileUpload(e)} />

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

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {renderForm()}
            
        </>
    )

};  

export default CreatePet;