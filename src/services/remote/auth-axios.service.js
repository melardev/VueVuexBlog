import {AxiosService} from "./base/axios.service";

export const AuthAxiosService = {

    login(user) {
        return AxiosService.post('/auth/login/', user);
    },

    create(user) {
        return AxiosService.post('/users/', user);
    },
};
