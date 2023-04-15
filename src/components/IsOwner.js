import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import petServices from "../services/pet.services";
import adoptionServices from "../services/adoption.services";

function IsOwner(props) {

    const {petId, adoptionId} = useParams();
    const [userIsOwner, setUserIsOwner] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {

        if(petId) {

            petServices.getPet(petId)
                .then((response) => {
                    const pet = response.data;
                    
                    if(pet.owner._id === user._id){
                        setUserIsOwner(true);
                    } 
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });

        } else if(adoptionId) {

            adoptionServices.getAdoption(adoptionId)
                .then((response) => {
                    const adoption = response.data;

                    if(adoption.announcer._id === user._id) {
                        setUserIsOwner(true);
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {userIsOwner ? 
                props.children
                :
                <></>
            }
        </>
    );
}

export default IsOwner;