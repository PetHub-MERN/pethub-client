import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Typography, MenuItem, FormHelperText, Select } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


function PetList(props) {

    const {resource: pets} = props;

    const navigate = useNavigate();

    const [speciesFilter, setSpeciesFilter] = useState("All");

    const filteredPets = useMemo(() => {

        if(speciesFilter === "All") {
            return pets;
        } else {
            
            return pets.filter((pet) => {
                return pet.species === speciesFilter;
              });

        }
    }, [pets, speciesFilter]);

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
                        <Select 
                            align="left"
                            value={speciesFilter}
                            onChange={(e) => {setSpeciesFilter(e.target.value)}}
                            sx={{m: 4, mb:0, width:"60%"}}
                        >
                            <MenuItem value="Dog">Dog</MenuItem>
                            <MenuItem value="Cat">Cat</MenuItem>
                            <MenuItem value="Bird">Bird</MenuItem>
                            <MenuItem value="Reptile">Reptile</MenuItem>
                            <MenuItem value="Fish">Fish</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            <MenuItem value="All">All</MenuItem>
                        </Select>
                        <FormHelperText sx={{textAlign:"center"}}>Filter by Species</FormHelperText>

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
                                                        m:3
                                                }}>
                                                    <CardMedia 
                                                        sx={{ height: 200}}
                                                        image={pet.imageUrl}
                                                        title={pet.name}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {pet.name}
                                                        </Typography>
                                                        <Chip sx={{m:1}} label={pet.species} color="warning" />
                                                        <Chip sx={{m:1}} label={pet.breed} color="warning" />
                                                        <Chip sx={{m:1}} label={pet.dateOfBirth.split('T')[0]} color="warning" />
                                                    </CardContent>
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