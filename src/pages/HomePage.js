import registerAPetImage from '../assets/registerAPetHomePage.jpg';
import seeAllPetsImage from '../assets/seeAllPetsHomePage.jpg';
import createAdoptionImage from '../assets/createAdoptionHomePage.jpg';
import seeAdoptionsImage from '../assets/seeAdoptionsHomePage.jpg';
import { Box, Card, CardActionArea, CardContent, Typography, Button } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate("/login");
    }

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: {xs: "column", md:"row"},
            justifyContent: "center",
            marginTop: "6%"
          }}
        >
            <Box sx={{
            display: "flex",
            flexDirection: {xs: "column", md:"column", xl:"row"},
            justifyContent: "center",
            flex: 1
            }}>
                <Card
                sx={{
                flex: 1,
                m: 5,
                }}>
                    <CardActionArea onClick={handleCardClick}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={registerAPetImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                REGISTER A PET
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Register your pet with us to create a profile and connect with potential adopters. Don't wait - give your pet the chance to find their perfect match today!
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                    <Button
                    sx={{ my: 2 }}
                    variant="contained"
                    onClick={handleCardClick}
                    >
                        REGISTER A PET
                    </Button>
                </Card>

                <Card
                    sx={{
                    flex: 1,
                    m: 5,
                    }}>
                    <CardActionArea onClick={handleCardClick}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={seeAllPetsImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                SEE ALL THE PETS
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Check out the animal registry on our
                                page! It's filled with 
                                puppies, kittens, lions, and tigers. So, let's go take a
                                peek together!
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                    <Button
                    sx={{ my: 3 }}
                    variant="contained"
                    onClick={handleCardClick}
                    >
                    SEE ALL PETS
                    </Button>
                </Card>
            </Box>
            
            <Box sx={{
            display: "flex",
            flexDirection: {xs: "column", md:"column", xl:"row"},
            justifyContent: "center",
            flex: 1
            }}>
                    <Card
                    sx={{
                    flex: 1,
                    m: 5,
                    }}>
                    <CardActionArea onClick={handleCardClick}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={createAdoptionImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            CREATE AN ADOPTION
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Our site offers pet adoption services and company animal rental programs. Find a new home for your furry friend or rent them out to spread some joy. Check us out now!
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                    <Button
                    sx={{ my: 3 }}
                    variant="contained"
                    onClick={handleCardClick}
                    >
                    ANNOUNCE
                    </Button>
                </Card>

                <Card
                    sx={{
                    flex: 1,
                    m: 5,
                    }}>
                    <CardActionArea onClick={handleCardClick}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={seeAdoptionsImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            SEE ALL ADOPTIONS
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Find your perfect adoption bundle or company animal rental now! Click to browse all the available options and bring some joy to your life.
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                    <Button
                    sx={{ my: 3 }}
                    variant="contained"
                    onClick={handleCardClick}
                    >
                    SEE ALL PETS
                    </Button>
                </Card>
            </Box>
        </Box>
      </>
    );
}

export default HomePage;