import { Alert, AlertTitle, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adoptionServices from "../services/adoption.services";
import IsOwner from "./IsOwner";

function AdoptionDetails(props) {

    const {resource: adoption, resourceId: adoptionId, errorMessage} = props;

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
                
                <Card sx={{ maxWidth: "60%",
                            flexGrow: 1 }}
                >
                    <CardHeader 
                        align="left"
                        avatar={<Avatar src={adoption.announcer.imageUrl}></Avatar>}
                        title={adoption.announcer.name}
                        subheader="Announcer"
                    />
                    <CardMedia 
                        sx={{ height:"300px" }}
                        image={adoption.imageUrl}
                        title={adoption.title}
                    />
                    <CardContent>
                        <Typography sx={{fontSize:"2.2rem"}} variant="h4">{adoption.title}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>📍 Location:</strong> {adoption.location}</Typography>
                        <Typography sx={{fontWeight:"normal"}} variant="h6"><strong>Description:</strong> {adoption.description}</Typography>
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
            <Typography sx={{ typography: { sm: 'h4', xs: 'h4', md: "h3" } }} variant="h2" marginTop={4}>🦊 <strong>{adoption ? adoption.title : <CircularProgress /> }</strong> 🐯</Typography>

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