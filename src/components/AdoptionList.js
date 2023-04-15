import { Alert, AlertTitle, Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdoptionList(props) {

    const navigate = useNavigate();
    const {resource: adoptions, errorMessage} = props;
    
    useEffect(() => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Typography variant="h2" marginTop={4}>🦊 List of <strong>Adoptions</strong> 🐯</Typography>

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {adoptions ?
                <>
                    {renderAdoptions()}
                </>
                :
                <Typography variant="h3">Loading...</Typography>
            }
        </>
    );
}

export default AdoptionList;