import { Alert, AlertTitle, Box, Button, Card, CardMedia, CircularProgress, Typography, TextField } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function AdoptionList(props) {

    const navigate = useNavigate();
    const {resource: adoptions, errorMessage} = props;

    const [searchLocation, setSearchLocation] = useState("");

    const filteredAdoptions = useMemo(() => {
        if(adoptions) {
            return adoptions.filter((adoption) => {
                return adoption.location.toLowerCase().includes(searchLocation.toLowerCase());
              })
        }
    }, [searchLocation, adoptions]);
    
    useEffect(() => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderAdoptions = () => {
        return (
            <>

                {!props.isProfilePage &&
                    <TextField variant="outlined" type="text" label="Search by location:" value={searchLocation} onChange={(e) => {setSearchLocation(e.target.value)}} sx={{
                        m: 4, mb:0, width:"60%"
                    }}/>
                }

                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    m: 4
                }}>

                    {filteredAdoptions.map(adoption => {
                        return (
                            <Card
                                key={adoption._id}
                                sx={{
                                    width: 300,
                                    m:3
                            }}>
                                <CardMedia 
                                    sx={{ height: 140 }}
                                    image={adoption.imageUrl}
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
            </>
        );
    }

    return (
        <>
            
            {props.isProfilePage ?
            <Typography sx={{ typography: { sm: 'h4', xs: 'h5', md: "h3" } }} variant="h3" marginTop={4}>🦊 Your <strong>Adoptions</strong> 🐯</Typography>
            :
            <Typography sx={{ typography: { sm: 'h4', xs: 'h5', md: "h3" } }} variant="h3" marginTop={4}>🦊 List of <strong>Adoptions</strong> 🐯</Typography>
            }

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
                <CircularProgress />
            }
        </>
    );
}

export default AdoptionList;