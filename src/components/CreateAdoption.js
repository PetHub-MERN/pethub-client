import { Alert, AlertTitle, Button, Card, CardMedia, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import { AuthContext } from "../context/auth.context";
import petServices from "../services/pet.services";
import imageServices from "../services/image.services";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingIcon from '@mui/icons-material/Pending';

function CreateAdoption(props) {


    const [ownedPets, setOwnedPets] = useState(null);
    const {user} = useContext(AuthContext);

    const {isDedicatedPage, callbackToUpdate, callbackToCloseForm} = props;

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [selectedPets, setSelectedPets] = useState([]);
    const [description, setDescription] = useState("");

    const [imageUrl, setImageUrl] = useState(null);
    const [isUrlReady, setIsUrlReady] = useState(true);

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        petServices.getAllPets()
            .then((response) => {
                const petsArr = response.data;
                const ownedPetsArr = petsArr.filter(pet => pet.owner._id === user._id);
                setOwnedPets(ownedPetsArr);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(selectedPets.length === 0) {
            setErrorMessage("Pick at least 1 pet!");
            return;
        }

        if(isUrlReady) {

            const newAdoptionData = {
                title,
                location,
                description,
                pets: selectedPets,
                imageUrl
            }
    
            adoptionServices.createAdoption(newAdoptionData)
                .then((response) => {
                    setTitle("");
                    setSelectedPets([]);
                    setErrorMessage(null);
                    setDescription("");
                    setLocation("");
                    setImageUrl(null);
    
                    if(callbackToUpdate && callbackToCloseForm && !isDedicatedPage){
                        callbackToUpdate();
                        callbackToCloseForm();
                    } else {
                        navigate("/adoptions");
                    }
    
                }).catch((err) => {
                    setErrorMessage(err.response.data.message);
                });
        } else {
            setErrorMessage("Image is loading...")
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

    const handlePetSelection = (petId) => {
        const updatedSelection = [...selectedPets];

        if(selectedPets.includes(petId)){
            const indexToRemove = updatedSelection.indexOf(petId);
            updatedSelection.splice(indexToRemove, 1);
        } else {
            updatedSelection.push(petId);
        }

        setSelectedPets(updatedSelection);
    }

    const renderForm = () => {

        if(ownedPets.length === 0) {
            return (
                <>
                    <Typography variant="h5">You don't have any registered Pets yet!</Typography>
                    <Link to={"/register-pet"}><strong>Register a new Pet!</strong></Link>
                    <br />
                </>
            );
        } else {

            return (                

                <form onSubmit={handleSubmit}>
                    <Container sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "inherit"
                    }}>
                        <TextField 
                            required 
                            fullWidth 
                            type="text" 
                            label="Title" 
                            value={title} 
                            onChange={(e) => {setTitle(e.target.value)}}
                            sx={{
                                m:1
                            }}                            
                            />
                        <TextField 
                            required 
                            fullWidth 
                            type="text" 
                            label="Location" 
                            value={location} 
                            onChange={(e) => {setLocation(e.target.value)}} 
                            sx={{
                                m:1
                            }}
                            />
    
                        <TextField 
                            required 
                            fullWidth 
                            type="text" 
                            multiline 
                            minRows={3} 
                            label="Decription" 
                            value={description} 
                            onChange={(e) => {setDescription(e.target.value)}} 
                            sx={{
                                my:2,
                                mx:1
                            }}
                            />
    
                        <Typography variant="h6"><strong>Select Pets for Adoption</strong></Typography>
                        <Paper sx={{
                            height: "275px",
                            width: "inherit",
                            overflow: "auto",
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}>
    
                            {renderPets()}
                            
                        </Paper>
    
                        <Paper sx={{mt: 1, mb: 1}}>
                            {selectedPets.length === 0 ? 
                                <Typography><strong>You don't have any Pet selected</strong></Typography>
                                :
                                <Typography><strong>Pets Selected:</strong> {selectedPets.map((petId) => {
                                    const pet = ownedPets.filter((pet) => {return pet._id === petId})[0];
                                    return ` ${pet.name}, `
                                })}</Typography>
                            }
                        </Paper>

                        <Button variant="contained" component="label" endIcon={(!imageUrl && isUrlReady) ? <AddAPhotoIcon/> : (imageUrl && isUrlReady) ? <CheckBoxIcon /> : <PendingIcon />}>
                            Upload Photo
                            <input type="file" name="imageUrl" hidden onChange={(e) => handleFileUpload(e)} />
                        </Button>

                        {isUrlReady ?
                            <Button 
                                size="large" 
                                onClick={handleSubmit}
                                variant="outlined"
                                sx={{
                                    m: 2
                                }}
                                >CREATE</Button>
                            :
                            <CircularProgress sx={{mt: 2}}/>
                        }
    
                    </Container>             
    
                </form>
                
            );
        }

    }

    const renderPets = () => {
        
        return ownedPets.map((pet) => {
            return(
                <Card key={pet._id} sx={{
                    width: 150,
                    minHeight: 200,
                    m: 3
                }}>
                    
                    <CardMedia 
                        sx={{ height: 150 }}
                        image={pet.imageUrl}
                        title={pet.name}
                    />
                    <Typography variant="h6">{pet.name}</Typography>
                    <Button
                        onClick={() => handlePetSelection(pet._id)}
                        sx={{
                            m: 1
                        }}
                    >{selectedPets.includes(pet._id) ? "DESELECT" : "SELECT"}</Button>

                </Card>
            );
        })
        
    }

    return(
        <>
            <Typography variant="h3" sx={{
                m: 4
            }}>New <strong>Adoption</strong></Typography>

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {ownedPets ? 
                <>
                    {renderForm()}
                </>
                :
                <CircularProgress />
            }

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
    );
}

export default CreateAdoption;