import axios from "axios";

class UserServices {

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

    getUser = (userId) => {
        return this.api.get(`/api/users/${userId}`);
    }

    uploadImage = (file) => {
        return this.api.post(`/api/upload`, file)
    }

    editUser = (userId, updatedUserData) => {
        return this.api.put(`/api/users/${userId}`, updatedUserData);
    }

}

const userServices = new UserServices();

export default userServices;