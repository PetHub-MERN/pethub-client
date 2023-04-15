import { Box } from "@mui/material";
import CreateAdoption from "../components/CreateAdoption";
import CreatePet from "../components/CreatePet"
import EditAdoption from "../components/EditAdoption";
import EditPet from "../components/EditPet";
import adoptionServices from "../services/adoption.services";
import { useState } from "react";
import AdoptionList from "../components/AdoptionList";
import { useParams } from "react-router-dom";
import AdoptionDetails from "../components/AdoptionDetails"
import petServices from "../services/pet.services";
import PetList from "../components/PetList";
import PetDetails from "../components/PetDetails";
import IsOwner from "../components/IsOwner";


function ResourcePage(props) {

    const {page} = props;

    //Adoptions List
    const [adoptions, setAdoptions] = useState(null);

    const getAllAdoptions = () => {
        adoptionServices.getAllAdoptions()
            .then((response) => {
                setAdoptions(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }
    
    //Adoption details
    const [adoption, setAdoption] = useState(null);
    const {adoptionId} = useParams();

    const getAdoptionDetails = () => {
        adoptionServices.getAdoption(adoptionId)
            .then((response) => {
                setAdoption(response.data);
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }

    //Pets List
    const [pets, setPets] = useState(null);

    const getAllPets = () => {
        petServices.getAllPets()
            .then( response => {
                setPets(response.data);
            })
            .catch( err => {
                console.log(err);
            }
        );
    }

    //Pet Details
    const [pet, setPet] = useState(null);
    const { petId } = useParams();

    const getPetDetails = () => {
        petServices.getPet(petId)
            .then( response => {
                setPet(response.data);
            })
            .catch( err => {
                console.log(err);
            }
        );
    }

    //For All
    const [errorMessage, setErrorMessage] = useState(null);

    const renderResourceRelatedForm = () => {
        return (
            <Box sx={{
                flex: 1,
                maxHeight: "80vh",
                overflow: "auto",
            }}>

                {/* Render resource related form component */}

                {/* For Adoptions */}
                {page === "adoptions-list" && <CreateAdoption callbackToUpdate={getAllAdoptions}/> }
                {page === "adoption-details" && <EditAdoption callbackToUpdate={getAdoptionDetails}/> }

                {/* For Pets */}
                {page === "pets-list" && <CreatePet callbackToUpdate={getAllPets}/> }
                {page === "pet-details" && <EditPet callbackToUpdate={getPetDetails}/> }
                
            </Box>
        );
    }

    return (
        <>

            <Box sx={{
                display: "flex",
            }}>
                
                {page === "pet-details" || page === "adoption-details" ?
                    <IsOwner>
                        {renderResourceRelatedForm()}
                    </IsOwner>
                    :
                    <>
                        {renderResourceRelatedForm()}
                    </>
                }

                <Box sx={{
                    flex: 3,
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>

                    {/* Render resouce component */}

                    {/* For Adoptions */}
                    {page === "adoptions-list" && <AdoptionList functionToGetResources={getAllAdoptions} resource={adoptions} errorMessage={errorMessage}/> }
                    {page === "adoption-details" && <AdoptionDetails functionToGetResources={getAdoptionDetails} resource={adoption} resourceId={adoptionId} errorMessage={errorMessage}/> }

                    {page === "pets-list" && <PetList functionToGetResources={getAllPets} resource={pets} errorMessage={errorMessage}/> }
                    {page === "pet-details" && <PetDetails functionToGetResources={getPetDetails} resource={pet} resourceId={petId} errorMessage={errorMessage}/> }

                </Box>
            </Box>

        </>
    );
}

export default ResourcePage;