import axios from "axios";

class ImageServices {

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

    uploadImage = (file) => {
        return this.api.post(`/api/upload`, file)
    }
}

const imageServices = new ImageServices();

export default imageServices;