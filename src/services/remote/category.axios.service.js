import {AxiosService} from "./base/axios.service";

export const CategoryAxiosService = {
    fetchAll() {
        return AxiosService.get('categories');
    },
};