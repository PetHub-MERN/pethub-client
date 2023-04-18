import registerAPetImage from '../assets/registerAPetHomePage.jpg';
import seeAllPetsImage from '../assets/seeAllPetsHomePage.jpg';
import createAdoptionImage from '../assets/createAdoptionHomePage.jpg';
import seeAdoptionsImage from '../assets/seeAdoptionsHomePage.jpg';
import { Box, Card, CardActionArea, CardContent, Typography, Button, Container } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import { AuthContext } from '../context/auth.context';

function HomePage() {

    const navigate = useNavigate();

    const [welcomeContent, setWelcomeContent] = useState("welcome");

    const { user, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if(isLoggedIn) {
            setWelcomeContent("loggedin");
        } else {
            setWelcomeContent("welcome");
        }
    }, [isLoggedIn]);

    const handleCardClick = (option) => {
        switch (option){
            case "register pet":
                navigate("/register-pet");
                break;
            case "see pets":
                navigate("/pets");
                break;
            case "create adoption":
                navigate("/register-adoption");
                break;
            case "see adoptions":
                navigate("/adoptions");
                break;
            default:
                console.log("Invalid option");
        }
    }

    const renderWelcomeContent = () => {
        
        switch(welcomeContent){

            case "welcome":
                return (
                    <>
                        <Typography variant='h2' sx={{
                            m:2
                        }}>Welcome to <strong>Pet</strong>Hub!</Typography>

                        <Typography variant='h6' sx={{
                            mb: 2,
                        }}>Wether you are looking for a new Home for your Buddy, or for a Buddy to bring more life to your Home, <strong>Pet</strong>Hub has the solution! <br/> Interested?</Typography>

                        <Button 
                            variant='contained' 
                            onClick={() => {setWelcomeContent("signup")}}
                            sx={{
                                width: "150px",
                                mb: 2
                            }
                        }>Into The Fluff!</Button>
                    </>
                );
            
            case "login":
                return (
                    <>
                        <LoginForm />
                        <Typography>Don't have an Account? <Button variant="text" onClick={() => {setWelcomeContent("signup")}}>SignUp</Button></Typography>
                    </>
                );

            case "signup":
                return (
                    <>
                        <SignUpForm />
                        <Typography>Already have an Account? <Button variant="text" onClick={() => {setWelcomeContent("login")}}>LogIn</Button></Typography>
                    </>
                );
            
            case "loggedin":
                return (
                    <>
                        <Typography variant='h2' sx={{
                            fontSize: {xs: "6vw", md: "3rem"},
                            m:2

                        }}>Welcome to <strong>Pet</strong>Hub{user ? <>, <strong>{user.name}</strong></> : ""}!</Typography>

                        <Typography variant='h6' sx={{
                            mb: 2,
                            display: {xs: "none", md: "block"}
                        }}>Wether you are looking for a new Home for your Buddy, or for a Buddy to bring more life to your Home, <strong>Pet</strong>Hub has the solution!
                        </Typography>
                    </>
                );

            default:
                console.log("Invalid Option");
        }
    }

    return (
      <>
        <Box sx={{
            m: 0,
            height: "70vh",
            backgroundImage: `url(${seeAdoptionsImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0px 1px 9px 0px rgb(77,77,77)",
            display: "flex",
            flexDirection: "column",
            justifyContent:"center"
        }}>

            <Container sx={{
                borderRadius: 1,
                backgroundColor: "rgba(240,240,240, 0.9)",
                display: "flex",
                flexDirection: "column",
                justifyContent:"center",
                alignItems: "center",
                width: "60%",
            }}>

                <Box sx={{
                    display: {xs: "none", md: "flex"},
                    flexDirection: "column",
                    justifyContent:"center",
                    alignItems: "center",
                }}>
                    {renderWelcomeContent()}
                </Box>

                <Box sx={{
                    display: {xs: "block", md: "none"}
                }}>
                    <Typography sx={{fontSize: "6vw"}}>Welcome {user ? <strong>{user.name}</strong> : <>to <strong>Pet</strong>Hub</>}!</Typography>
                </Box>

            </Container>


        </Box>

        
        <Box>
            
            <Typography variant="h3" sx={{
                m: 3
            }}>In <strong>Pet</strong>Hub you can:</Typography>

            <Box
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md:"row"},
                justifyContent: "center",
            }}
            >
                <Box sx={{
                display: "flex",
                flexDirection: {xs: "column", xl:"row"},
                justifyContent: "center",
                flex: 1
                }}>
                    <Card
                    sx={{
                    flex: 1,
                    m: 5,
                    }}>
                        <CardActionArea onClick={() => {handleCardClick('register pet')}}>
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
                        onClick={() => {handleCardClick('register pet')}}
                        >
                            REGISTER A PET
                        </Button>
                    </Card>

                    <Card
                        sx={{
                        flex: 1,
                        m: 5,
                        }}>
                        <CardActionArea onClick={() => {handleCardClick('see pets')}}>
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
                        onClick={() => {handleCardClick('see pets')}}
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
                        <CardActionArea onClick={() => handleCardClick("create adoption")}>
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
                        onClick={() => handleCardClick("create adoption")}
                        >
                        ANNOUNCE
                        </Button>
                    </Card>

                    <Card
                        sx={{
                        flex: 1,
                        m: 5,
                        }}>
                        <CardActionArea onClick={() => handleCardClick("see adoptions")}>
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
                        onClick={() => handleCardClick("see adoptions")}
                        >
                        SEE ALL PETS
                        </Button>
                    </Card>
                </Box>
            </Box>
        </Box>
        
      </>
    );
}

export default HomePage;