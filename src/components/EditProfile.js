import { useContext, useState } from "react";
import userServices from "../services/user.services";
import { Alert, AlertTitle, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/auth.context";
import imageServices from "../services/image.services";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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
                    
                    <Button variant="contained" component="label" endIcon={<AddAPhotoIcon />}>
                        Upload Photo
                        <input type="file" name="imageUrl" hidden onChange={(e) => handleFileUpload(e)} />
                    </Button>

                    <Button sx={{mb: 3, mt: 3}} onClick={handleFormSubmit} variant="outlined">EDIT PROFILE!</Button>
                </Container>
            </form>
        ); 
    }

    return(
        <>
            <Typography variant="h3" sx={{
                m: 4
            }}>Edit <strong>Profile</strong></Typography>

            {errorMessage &&
                <Alert align="left" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            }

            {renderForm()}

        </>
    )
};

export default EditProfile;