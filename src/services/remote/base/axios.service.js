import axios from "axios";
import {environment} from "@/config/environment";

let cachedUser = {};
export const setUser = (user) => {
    cachedUser = user;
};

// return an axios instance
const axiosInstance = axios.create({
    baseURL: environment.ApiConfig.urls.base,
    responseType: 'json',
    responseEncoding: 'utf8'
});

axiosInstance.interceptors.request.use((config) => {

    if (cachedUser.username)
        config.headers.authorization = "Bearer " + cachedUser.token;

    return config;
}, function (error) {
    return Promise.reject(error);
});

function get(path) {
    return axiosInstance.get(path)
}

function fetchPage(path, page = 1, page_size = 5) {
    return axiosInstance.get(`${path}?page=${page || 1}&page_size=${page_size || 5}`)
}

function post(path, data) {
    return axiosInstance.post(path, data);
}

function put(path) {

}

function _delete(path) {

}

export const AxiosService = {
    axiosInstance, get, post, put, delete: _delete, setUser, fetchPage
};
