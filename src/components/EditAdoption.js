import { Alert, AlertTitle, Button, Card, CardMedia, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import { AuthContext } from "../context/auth.context";
import petServices from "../services/pet.services";

function EditAdoption(props) {


    const [ownedPets, setOwnedPets] = useState(null);
    const {user} = useContext(AuthContext);
    const {adoptionId} = useParams();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [selectedPets, setSelectedPets] = useState([]);
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        petServices.getAllPets()
            .then((response) => {
                const petsArr = response.data;
                const ownedPetsArr = petsArr.filter(pet => pet.owner._id === user._id);

                setOwnedPets(ownedPetsArr);

                return adoptionServices.getAdoption(adoptionId);
            })
            .then((response) => {
                const adoption = response.data;

                setTitle(adoption.title);
                setLocation(adoption.location);
                setDescription(adoption.description);
                const petIds = adoption.pets.map(pet => pet._id);
                setSelectedPets(petIds);

            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedAdoptionData = {
            title,
            location,
            description,
            pets: selectedPets
        }

        adoptionServices.editAdoption(adoptionId, updatedAdoptionData)
            .then((response) => {
                setErrorMessage(null);

                if(props.callbackToUpdate){
                    props.callbackToUpdate();
                }

            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
        
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
                        height: "30vh",
                        width: "inherit",
                        overflow: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>

                        {renderPets()}
                        
                    </Paper>

                    <Paper>
                        {selectedPets.length === 0 ? 
                            <Typography><strong>You don't have any Pet selected</strong></Typography>
                            :
                            <Typography><strong>Pets Selected:</strong> {selectedPets.map((petId) => {
                                const pet = ownedPets.filter((pet) => {return pet._id === petId})[0];
                                return ` ${pet.name};`
                            })}</Typography>
                        }
                    </Paper>

                    <Button 
                        size="large" 
                        onClick={handleSubmit}
                        variant="outlined"
                        sx={{
                            m: 2
                        }}
                        >EDIT ADOPTION!</Button>
                </Container>             

            </form>
        );
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
                        sx={{ height: 140 }}
                        image="https://via.placeholder.com/600x400?text=PET+IMAGE"
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
            }}>Edit <strong>Adoption</strong></Typography>

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

        </>
    );
}

export default EditAdoption;