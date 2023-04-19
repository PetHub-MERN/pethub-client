import { Alert, AlertTitle, Avatar, Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import IsOwner from "./IsOwner";

function AdoptionDetails(props) {

    const {resource: adoption, resourceId: adoptionId, errorMessage} = props;

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteClick = () => {
        adoptionServices.deleteAdoption(adoptionId)
            .then( response => {
                navigate('/adoptions')
            })
            .catch( err => {
                console.error('Failed deleting')
            })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handlePetClick = (petId) => {
        navigate(`/pets/${petId}`);
    }

    const renderPets = () => {
        
        return adoption.pets.map((pet) => {
            return(
                <Card key={pet._id} sx={{
                    width: 150,
                    minHeight: 200,
                    m: 3
                }}>
                    
                    <CardMedia 
                        sx={{ height: 140 }}
                        image={pet.imageUrl}
                        title={pet.name}
                    />
                    <Typography variant="h6">{pet.name}</Typography>
                    <Button
                        variant="text"
                        onClick={() => handlePetClick(pet._id)}
                        sx={{
                            m: 1
                        }}
                    >See Details</Button>

                </Card>
            );
        })
        
    }

    const renderAdoption = () => {
        return(
            <Box 
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md:"row"},
                justifyContent: "center",
                alignItems:"center",
                m: 5
            }}> 
                
                <Card sx={{ 
                    maxWidth: {xs: "100%", sm: "80%", md: "70%", lg: "60%", xl: "50%"},
                    flexGrow: 1
                }}>
                    <CardHeader 
                        align="left"
                        avatar={<Avatar src={adoption.announcer.imageUrl}></Avatar>}
                        title={adoption.announcer.name}
                        subheader="Announcer"
                    />
                    <CardMedia 
                        sx={{ height:"300px", "&:hover": {cursor: "pointer"} }}
                        image={adoption.imageUrl}
                        title={adoption.title}
                        onClick={handleOpen}
                    />
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <img src={adoption.imageUrl} alt={adoption.title} style={{maxHeight: '70vh', maxWidth: '70vw'}} />
                    </Backdrop>
                    <CardContent>
                        <Typography sx={{fontSize:"2.2rem"}} variant="h4">{adoption.title}</Typography>
                        <Typography sx={{fontSize:"1.5rem"}} variant="body1">
                            {adoption.pets.length > 1 ? 'The pets in this adoption bundle are:' : 'The pet in this adoption bundle is:'}
                        </Typography>

                        <Container sx={{
                            height: "30vh",
                            width: "inherit",
                            overflow: "auto",
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}>
    
                            {renderPets()}
                            
                        </Container>
                        
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>📍 Location:</strong> {adoption.location}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Description:</strong> {adoption.description}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Contact:</strong> {adoption.announcer.email}</Typography>
                    </CardContent>

                    <IsOwner>
                        <CardActions sx={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                            <Button onClick={() => {handleDeleteClick()}} size="large" variant="contained" color="error">DELETE</Button>
                        </CardActions>
                    </IsOwner>
                </Card>
                
            </Box>
        );
    }
    

    return (
        <>
            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {adoption ?
                <>
                    {renderAdoption()}
                </>
                :
                <CircularProgress />
            }
        </>
    );
}

export default AdoptionDetails;