/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PetDetailsPage = () => {

    const [pet, setPet] = useState(null);

    const { petId } = useParams();

    const getPetDetails = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/pets/${petId}`)
            .then( response => {
                console.log(response.data);
                setPet(response.data);
            })
            .catch( err => {
                console.log(err);
            }
        );
    }

    useEffect( () => {
        getPetDetails();
    }, []);

    return (
        <> {pet &&
            <h1>{pet.name}</h1>
        }
        </>
    )

};

export default PetDetailsPage;