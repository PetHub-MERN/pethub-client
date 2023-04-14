import { Button, Card, CardMedia, Container, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import { AuthContext } from "../context/auth.context";
import petServices from "../services/pet.services";

function CreateAdoptionPage() {

    const navigate = useNavigate();

    const [ownedPets, setOwnedPets] = useState(null);
    const {user} = useContext(AuthContext);

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
            }).catch((err) => {
                setErrorMessage(err);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAdoptionData = {
            title,
            location,
            description,
            pets: selectedPets
        }

        adoptionServices.createAdoption(newAdoptionData)
            .then((response) => {
                navigate("/");                
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
                }}>
                    <TextField type="text" label="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <TextField type="text" label="Location" value={location} onChange={(e) => {setLocation(e.target.value)}} />

                    <Typography variant="h6"><strong>Select Pets for Adoption</strong></Typography>
                    <Paper sx={{
                        height: "30vh",
                        width: "40vw",
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

                    <TextField type="text" multiline minRows={3} label="Decription" value={description} onChange={(e) => {setDescription(e.target.value)}} />

                    <Button size="large" onClick={handleSubmit}>CREATE</Button>
                </Container>             

            </form>
        );
    }

    const renderPets = () => {
        if(ownedPets.length === 0) {
            return (
                <>
                    <Typography variant="h5">You don't have any registered Pets yet!</Typography>
                    <Link to={"/register-pet"}><strong>Register a new Pet!</strong></Link>
                </>
            );
        }

        return ownedPets.map((pet) => {
            return(
                <Card key={pet._id} sx={{
                    width: 200,
                    minHeight: 200,
                    m: 3
                }}>
                    <Typography variant="h6">{pet.name}</Typography>
                    <CardMedia 
                        sx={{ height: 140 }}
                        image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                        title={pet.name}
                    />
                    <Button onClick={() => handlePetSelection(pet._id)}>{selectedPets.includes(pet._id) ? "DESELECT" : "SELECT"}</Button>

                    
                </Card>
            );
        })
    }

    return(
        <>
            <Typography variant="h3">Create an Adoption Announcement</Typography>

            {ownedPets ? 
                <>
                    {renderForm()}
                </>
                :
                <Typography variant="h5"><strong>Loading...</strong></Typography>
            }

            {errorMessage && <Typography>{errorMessage}</Typography>}

        </>
    );
}

export default CreateAdoptionPage;


