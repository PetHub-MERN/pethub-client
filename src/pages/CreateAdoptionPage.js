import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAdoptionPage() {

    const navigate = useNavigate();

    const [ownedPets, setOwnedPets] = useState(null);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [selectedPets, setSelectedPets] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        //send axios post request
        
        navigate("/");
    }

    return(
        <>
            <Typography variant="h3">Create an Adoption Announcement</Typography>

            <form onSubmit={handleSubmit}>
                <TextField type="text" label="Title" onChange={(e) => {setTitle(e.target.value)}} />
                <TextField type="text" label="Location" onChange={(e) => {setLocation(e.target.value)}} />
                

            </form>
        </>
    );
}

export default CreateAdoptionPage;


