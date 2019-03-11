import {CategoryAction, NotificationAction} from "@/store/types.actions";
import {CategoryAxiosService} from "@/services/remote/category.axios.service";

const initialState = {
    isLoading: false,
    categories: [],
};

const mutations = {
    [CategoryAction.local.SET_IS_LOADING](state, isLoading) {
        state.isLoading = isLoading;
    },
    [CategoryAction.local.SET_CATEGORIES](state, data) {
        state.categories = data.categories;
    },
};

const actions = {
    [CategoryAction.remote.FETCH_ALL](context) {
        context.commit(CategoryAction.local.SET_IS_LOADING, true);
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return CategoryAxiosService.fetchAll().then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    context.commit(CategoryAction.local.SET_CATEGORIES, {
                        categories: response.data.categories
                    });
                    resolve(response.data);
                }
            }).catch(err => {
                debugger
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(`notifications/${NotificationAction.SET_ERROR}`, err.message, {root: true});
            });
        });
    },
};

const getters = {
    getCategories: state => state.categories,
};

export const categories = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
