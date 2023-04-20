import { useContext, useState } from "react";
import userServices from "../services/user.services";
import { Alert, AlertTitle, Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { AuthContext } from "../context/auth.context";
import imageServices from "../services/image.services";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingIcon from '@mui/icons-material/Pending';


const EditProfile = (props) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [isUrlReady, setIsUrlReady] = useState(true);

    const [errorMessage, setErrorMessage] = useState(null);

    const { user } = useContext(AuthContext);  

    const handleFileUpload = (e) => {

        setIsUrlReady(false);

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        imageServices.uploadImage(uploadData)
            .then( response => {
                setImageUrl(response.data.fileUrl);
                setIsUrlReady(true);
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
            }
        );
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(isUrlReady && imageUrl === null) {
            setErrorMessage("You have to select a picture!");
        } else if(isUrlReady) {
            userServices.editUser(user._id, { imageUrl })
                .then((response) => {
                    props.callbackToUpdateUser();
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.message);
                }
            );
        } else {
            setErrorMessage("The image is loading. Please wait and try again!");
        }
    }

    const renderForm = () => {
        return(
            <form>
                <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "inherit"
                }}>
                    
                    <Button variant="contained" component="label" endIcon={(!imageUrl && isUrlReady) ? <AddAPhotoIcon/> : (imageUrl && isUrlReady) ? <CheckBoxIcon /> : <PendingIcon />}>
                        Upload Photo
                        <input type="file" name="imageUrl" hidden onChange={(e) => handleFileUpload(e)} />
                    </Button>

                    {isUrlReady && 
                        <Button sx={{mb: 3, mt: 3}} onClick={handleFormSubmit} variant="outlined">CONFIRM CHANGES!</Button>
                    }

                </Container>
            </form>
        ); 
    }

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Typography variant="h3" sx={{
                mt: 4
            }}>Edit <strong>Picture</strong></Typography>

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            <Paper 
                sx={{ 
                    width: {xs: '200px', xl: '300px'}, 
                    height: {xs: '200px', xl: '300px'}, 
                    backgroundImage: imageUrl ? `url(${imageUrl})` : "none ", 
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    m: 3

                }}
            >

                {(!imageUrl && isUrlReady) &&
                    <Typography variant="h5">Pick a Photo!</Typography>
                }

                {(!imageUrl && !isUrlReady) &&
                    <CircularProgress />
                }


            </Paper>


            {renderForm()}

        </Box>
    )
};

export default EditProfile;