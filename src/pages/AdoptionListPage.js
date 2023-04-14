import { useEffect, useState } from "react";
import adoptionServices from "../services/adoption.services";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdoptionListPage() {

    const[adoptions,  setAdoptions] = useState(null);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        adoptionServices.getAllAdoptions()
            .then((response) => {
                setAdoptions(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
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
                        <Card sx={{
                            width: 300,
                            m:3
                        }}>
                            <Typography variant="h6"><strong>{adoption.title}</strong></Typography>
                            <CardMedia 
                                sx={{ height: 140 }}
                                image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                                title={adoption.title}
                            />
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
            <Typography variant="h2">Available Adoptions</Typography>

            {adoptions ?
                <>
                    {renderAdoptions()}
                </>
                :
                <Typography variant="h3">Loading...</Typography>
            }

            {errorMessage && <Typography>{errorMessage}</Typography>}

        </>
    );
}

export default AdoptionListPage;