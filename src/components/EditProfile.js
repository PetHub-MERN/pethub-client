import { useContext, useState } from "react";
import userServices from "../services/user.services";
import { Alert, AlertTitle, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/auth.context";

const EditProfile = (props) => {

    const [userProfileImgUrl, setUserProfileImgUrl] = useState(null);
    const [isUrlReady, setIsUrlReady] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const { user } = useContext(AuthContext);  

    const handleFileUpload = (e) => {

        setIsUrlReady(false);

        const uploadData = new FormData();
        uploadData.append("userProfileImgUrl", e.target.files[0]);

        userServices.uploadImage(uploadData)
            .then( response => {
                setUserProfileImgUrl(response.data.fileUrl);
                setIsUrlReady(true);
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
            }
        );
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(isUrlReady) {
            userServices.editUser(user._id, { userProfileImgUrl })
                .then((response) => {
                    console.log(userProfileImgUrl);
                    props.callbackToUpdateUser();
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.message);
                }
            );
        } else {
            setErrorMessage("Image not Ready!");
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
                    
                    <input type="file" name="userProfileImgUrl" onChange={(e) => handleFileUpload(e)} />

                    <Button sx={{mb: 3}} onClick={handleFormSubmit} variant="outlined">EDIT PROFILE!</Button>
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