import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import { Box, Card, CardMedia, Typography } from "@mui/material";

function AdoptionDetailsPage() {

    const {adoptionId} = useParams();

    const [adoption, setAdoption] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        adoptionServices.getAdoption(adoptionId)
            .then((response) => {
                console.log(response.data);
                setAdoption(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderAdoption = () => {
        return(
            <>

                <Card sx={{
                    display: "flex",
                    flexDirection: {xs: "column", md: "row"},
                }}>
                
                    <CardMedia 
                        sx={{ height: 140 }}
                        image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                    />

                    <Typography variant="h2">{adoption.title}</Typography>

                </Card>
            </>
        );
    }

    return(
        <>
            {adoption ? 
                <>
                    {renderAdoption()}
                </>
                :
                <Typography variant="h2">Loading...</Typography>
            }
        </>
    );
}

export default AdoptionDetailsPage;