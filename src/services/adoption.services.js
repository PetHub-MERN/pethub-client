import axios from "axios";

class AdoptionServices {

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

    createAdoption = (newAdoptionData) => {
        return this.api.post(`/api/adoptions`, newAdoptionData);
    }

    getAdoption = (adoptionId) => {
        return this.api.get(`/api/adoptions/${adoptionId}`);
    }

    getAllAdoptions = () => {
        return this.api.get(`/api/adoptions`);
    }

    editAdoption = (adoptionId, updatedAdoptionData) => {
        return this.api.put(`/api/adoptions/${adoptionId}`, updatedAdoptionData);
    }

    deleteAdoption = (adoptionId) => {
        return this.api.delete(`/api/adoptions/${adoptionId}`);
    }


}

const adoptionServices = new AdoptionServices();

export default adoptionServices;