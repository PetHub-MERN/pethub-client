import { Alert, AlertTitle, Box, Button, Card, CardMedia, CircularProgress, Typography, TextField, MenuItem } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function AdoptionList(props) {

    const navigate = useNavigate();
    const {resource: adoptions, errorMessage} = props;

    const [searchLocation, setSearchLocation] = useState("");
    const [order, setOrder] = useState("newest");

    const sortAdoptions = (adoption, nextAdoption) => {
        if(adoption.createdAt > nextAdoption.createdAt) {
            return order === "newest" ? -1 : 1;
        } else {
            return order === "newest" ? 1 : -1;
        }        
    }

    const filteredAdoptions = useMemo(() => {
        if(adoptions) {
            const filteredArr = adoptions.filter((adoption) => {
                return adoption.location.toLowerCase().includes(searchLocation.toLowerCase());
              })

            return filteredArr.sort(sortAdoptions)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchLocation, adoptions, order]);
    
    useEffect(() => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderAdoptions = () => {
        return (
            <>
                {adoptions.length === 0 ? 
                    <Typography variant="h3" sx={{mt: 4}}>There are no adoptions registered in the DB...</Typography>
                    :

                    <>
                        {!props.isProfilePage &&
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: {xs: "100%", md: "60%", lg: "40%"},
                                my: 3,
                                mx: "auto"
                            }}>
                                <TextField variant="outlined" type="text" label="Search by location:" value={searchLocation} onChange={(e) => {setSearchLocation(e.target.value)}} sx={{
                                        flex: 1,
                                        mx: 1
                                    }}/>
             
                                
                                <TextField
                                    align="left"
                                    value={order}
                                    onChange={(e) => {setOrder(e.target.value)}}
                                    select
                                    label="Sort by"
                                    sx={{
                                        flex: 1,
                                        mx: 1
                                    }}
                                >
                                    <MenuItem value="oldest">Oldest</MenuItem>
                                    <MenuItem value="newest">Newest</MenuItem>                                
                                </TextField>
                                                              
                            </Box>
                        }

                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            m: 4
                        }}>

                            {filteredAdoptions.length === 0 ? 
                                <Typography variant="h4" sx={{mt: 4}}>There are no adoptions matching your search...</Typography>
                                :
                                <>
                                    {filteredAdoptions.map(adoption => {
                                        return (
                                            <Card
                                                key={adoption._id}
                                                sx={{
                                                    width: {xs: 250, md: 300},
                                                    m:3
                                            }}>
                                                <CardMedia 
                                                    sx={{ height: 200}}
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
                                </>
                            }

                        </Box>
                    </>
                }
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