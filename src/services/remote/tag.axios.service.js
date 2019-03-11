import {AxiosService} from "./base/axios.service";

export const TagAxiosService = {
    fetchAll() {
        return AxiosService.get('tags');
    },
};