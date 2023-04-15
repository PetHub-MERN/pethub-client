import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import EditAdoption from "../components/EditAdoption";

function AdoptionDetailsPage() {

    const {adoptionId} = useParams();

    const navigate = useNavigate();

    const [adoption, setAdoption] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        adoptionServices.getAdoption(adoptionId)
            .then((response) => {
                setAdoption(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditClick = () => {
        navigate(`/adoptions/edit/${adoptionId}`)
    };

    const handleDeleteClick = () => {
        adoptionServices.deleteAdoption(adoptionId)
            .then( response => {
                navigate('/adoptions')
            })
            .catch( err => {
                console.error('Failed deleting')
            })
    }

    const renderAdoption = () => {
        return(
            <Box 
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md:"row"},
                justifyContent: "center",
                m: 5
            }}> 
                
                <Card sx={{ maxWidth: "50%",
                            flexGrow: 1 }}
                >
                    <CardHeader 
                        align="left"
                        avatar={<Avatar>{adoption.announcer.name.charAt(0)}</Avatar>}
                        title={adoption.announcer.name}
                        subheader="Announcer"
                    />
                    <CardMedia 
                        sx={{ height:"300px" }}
                        image="https://via.placeholder.com/600x400?text=PET+IMAGE"
                        title={adoption.title}
                    />
                    <CardContent>
                        <Typography variant="h3">{adoption.title}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Description:</strong> {adoption.description}</Typography>
                    </CardContent>

                    <CardActions sx={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                        <Button onClick={() => {handleEditClick()}} size="large" variant="contained">EDIT</Button>
                        <Button onClick={() => {handleDeleteClick()}} size="large" variant="contained" color="error">DELETE</Button>
                    </CardActions>
                </Card>
                
            </Box>
        );
    }

    return(
        <>

            <Box sx={{
                display: "flex",
            }}>
                <Box sx={{
                    flex: 1,
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>
                    <EditAdoption />
                </Box>

                <Box sx={{
                    flex: 3,
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>
                    <Typography variant="h2" marginTop={4}>🦊 <strong>{adoption ? adoption.title : "Loading..."}</strong> 🐯</Typography>

                    {adoption ?
                        <>
                            {renderAdoption()}
                        </>
                        :
                        <Typography variant="h3">Loading...</Typography>
                    }

                </Box>
            </Box>

        </>
    );
}

export default AdoptionDetailsPage;