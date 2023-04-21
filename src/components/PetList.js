import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Typography, MenuItem, TextField } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


function PetList(props) {

    const {resource: pets} = props;

    const navigate = useNavigate();

    const [speciesFilter, setSpeciesFilter] = useState("All");
    const [order, setOrder] = useState("newest");

    const sortPets = (pet, nextPet) => {
        if(pet.createdAt > nextPet.createdAt) {
            return order === "newest" ? -1 : 1;
        } else {
            return order === "newest" ? 1 : -1;
        }        
    }

    const filteredPets = useMemo(() => {

        if(pets) {
            if(speciesFilter === "All") {
                console.log(pets);
                return pets.sort(sortPets);
            } else {
                
                const filteredArr = pets.filter((pet) => {
                    return pet.species === speciesFilter;
                  });
                
                return filteredArr.sort(sortPets);
    
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pets, speciesFilter, order]);

    const handleClickDetails = (petId) => {
        navigate(`/pets/${petId}`);
    }

    useEffect( () => {
        props.functionToGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderPets = () => {
        return(
            <>
                {pets.length === 0 ?
                    <Typography variant="h3" sx={{mt: 4}}>There are no pets registered in the DB...</Typography>
                    :
                    <>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: {xs: "100%", md: "60%", lg: "40%"},
                            my: 3,
                            mx: "auto"
                        }}>
                            <TextField
                                align="left"
                                value={speciesFilter}
                                onChange={(e) => {setSpeciesFilter(e.target.value)}}
                                sx={{
                                    flex: 1,
                                    mx: 1
                                }}
                                select
                                label="Species"
                            >
                                <MenuItem value="Dog">Dog</MenuItem>
                                <MenuItem value="Cat">Cat</MenuItem>
                                <MenuItem value="Bird">Bird</MenuItem>
                                <MenuItem value="Reptile">Reptile</MenuItem>
                                <MenuItem value="Fish">Fish</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                                <MenuItem value="All">All</MenuItem>
                            </TextField>
         
                            
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


                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            m: 4
                        }}>

                            {filteredPets.length === 0 ?
                                <Typography variant="h4" sx={{mt: 4}}>There are no pets matching your search...</Typography>
                                :
                                <>
                                    {pets && 
                                        filteredPets.map( pet => {
                                            return(
                                                <Card
                                                    key={pet._id}
                                                    sx={{
                                                        width: {xs: 250, md: 300},
                                                        m:3,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "space-between"
                                                }}>
                                                    <Box>
                                                        <CardMedia 
                                                            sx={{ height: 200, width: {xs: 250, md: 300}}}
                                                            image={pet.imageUrl}
                                                            title={pet.name}
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                {pet.name}
                                                            </Typography>
                                                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                                                <Chip sx={{my:1}} label={pet.species} color="warning" />
                                                                <Chip sx={{my:1}} label={pet.breed} color="warning" />
                                                                <Chip sx={{my:1}} label={pet.dateOfBirth.split('T')[0]} color="warning" />
                                                            </Box>
                                                        </CardContent>
                                                    </Box>

                                                    <CardActions>
                                                        <Button variant="outlined" onClick={() => {handleClickDetails(pet._id)}}>LEARN MORE</Button>
                                                    </CardActions>
                                                </Card>
                                            );
                                        })
                                    }
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

                <Typography sx={{ typography: { sm: 'h4', xs: 'h5', md: "h3" }, mt: 4 }} variant="h2">
                    🦊 Your <strong>Pets</strong> 🐯
                </Typography>
                :
                <Typography sx={{ typography: { sm: 'h4', xs: 'h5', md: "h3" }, mt: 4 }} variant="h2">
                    🦊 List of <strong>Pets</strong> 🐯
                </Typography>
            }

            {pets ?
                <>
                    {renderPets()}
                </>
                :
                <CircularProgress />
            }
        </>
    );
}

export default PetList;