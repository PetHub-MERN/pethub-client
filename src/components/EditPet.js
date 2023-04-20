import { useEffect, useState } from "react";
import petServices from "../services/pet.services";
import { Alert, AlertTitle, Button, CircularProgress, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import imageServices from "../services/image.services";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingIcon from '@mui/icons-material/Pending';


const EditPet = (props) => {

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);
    const [isUrlReady, setIsUrlReady] = useState(true);

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
            description,
            breed,
            species,
            imageUrl
        }

        if (isUrlReady) {

            petServices.editPet(petId, updatedPet)
                .then(response => {
                    setErrorMessage(null);

                    if (callbackToUpdate && callbackToCloseForm && !isDedicatedPage) {
                        callbackToUpdate();
                        callbackToCloseForm();
                    } else {
                        navigate(`/pets/${petId}`);
                    }
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message);
                }
            );
        } else {
            setErrorMessage("The image is loading. Please wait and try again!");
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
                    
                    <Select 
                        align="left"
                        fullWidth
                        value={species}
                        onChange={(e) => {setSpecies(e.target.value)}}
                        sx={{mt: 3}}
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

                    <Button variant="contained" component="label" endIcon={(!imageUrl && isUrlReady) ? <AddAPhotoIcon/> : (imageUrl && isUrlReady) ? <CheckBoxIcon /> : <PendingIcon />}>
                        Edit Photo
                        <input type="file" name="imageUrl" hidden onChange={(e) => handleFileUpload(e)} />
                    </Button>

                    {isUrlReady ?
                        <Button sx={{m: 3}} onClick={handleSubmit} variant="outlined">EDIT PET!</Button>
                        :
                        <CircularProgress sx={{mt: 2}}/>
                    }

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