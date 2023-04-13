import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import petServices from "../services/pet.services";

const PetDetailsPage = () => {

    const [pet, setPet] = useState(null);

    const { petId } = useParams();

    const getPetDetails = () => {
        petServices.getPet(petId)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <> {pet &&
            <h1>{pet.name}</h1>
        }
        </>
    )

};

export default PetDetailsPage;