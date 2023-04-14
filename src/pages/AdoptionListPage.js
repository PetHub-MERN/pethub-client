import { useEffect, useState } from "react";
import adoptionServices from "../services/adoption.services";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateAdoption from "../components/CreateAdoption";

function AdoptionListPage() {

    const[adoptions,  setAdoptions] = useState(null);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    const getAdoptions = () => {
        adoptionServices.getAllAdoptions()
            .then((response) => {
                setAdoptions(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }

    useEffect(() => {
        getAdoptions();
    }, []);

    const renderAdoptions = () => {
        return (
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                m: 4
            }}>

                {adoptions.map(adoption => {
                    return (
                        <Card
                            key={adoption._id}
                            sx={{
                                width: 300,
                                m:3
                        }}>
                            <CardMedia 
                                sx={{ height: 140 }}
                                image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                                title={adoption.title}
                            />
                            <Typography variant="h6"><strong>{adoption.title}</strong></Typography>
                            <Typography><strong>Location: {adoption.location}</strong></Typography>
                            <Typography><strong>Posted by: {adoption.announcer.name}</strong></Typography>
                            <Button onClick={() => {navigate(`/adoptions/${adoption._id}`)}}>See Details</Button>
                        </Card>
                    );
                })}

            </Box>
        );
    }

    return (
        <>

            <Box sx={{
                display: "flex",
            }}>
                <Box sx={{
                    flex: 1,
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>
                    <CreateAdoption callbackToUpdate={getAdoptions}/>
                </Box>

                <Box sx={{
                    flex: 3,
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>
                    <Typography variant="h2" marginTop={4}>🦊 List of <strong>Adoptions</strong> 🐯</Typography>

                    {adoptions ?
                        <>
                            {renderAdoptions()}
                        </>
                        :
                        <Typography variant="h3">Loading...</Typography>
                    }

                    {errorMessage && <Typography>{errorMessage}</Typography>}
                </Box>
            </Box>

        </>
    );
}

export default AdoptionListPage;