import axios from "axios";

class PetServices {

    constructor() {
        this.api = axios.create({baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005"});

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem("authToken");

            if(storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        })
    }

    createPet = (newPetData) => {
        return this.api.post(`/api/pets`, newPetData);
    }

    getPet = (petId) => {
        return this.api.get(`/api/pets/${petId}`);
    }

    getAllPets = () => {
        return this.api.get(`/api/pets`);
    }

    editPet = (petId, updatedPetData) => {
        return this.api.put(`/api/pets/${petId}`, updatedPetData);
    }

    deletePet = (petId) => {
        return this.api.delete(`/api/pets/${petId}`);
    }

}

const petServices = new PetServices();

export default petServices;