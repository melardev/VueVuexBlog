import axios from "axios";
import {UserService} from "@/services/local/user.service";


const axi = () => {
// return an axios instance
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        responseType: 'json',
        responseEncoding: 'utf8'
    });

    axiosInstance.interceptors.request.use((config) => {

        if (UserService.getToken())
            config.headers.authorization = "Bearer " + UserService.getToken();
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default axi;
