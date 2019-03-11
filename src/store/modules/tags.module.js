import {NotificationAction, TagAction} from "@/store/types.actions";
import {TagAxiosService} from "@/services/remote/tag.axios.service";

const initialState = {
    isLoading: false,
    tags: [],
};

const mutations = {
    [TagAction.local.SET_IS_LOADING](state, isLoading) {
        state.isLoading = isLoading;
    },
    [TagAction.local.SET_TAGS](state, data) {
        state.tags = data.tags;
    },
};

const actions = {
    [TagAction.remote.FETCH_ALL](context) {
        context.commit(TagAction.local.SET_IS_LOADING, true);
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return TagAxiosService.fetchAll().then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    context.commit(TagAction.local.SET_TAGS, {
                        tags: response.data.tags
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
    getTags: state => state.tags,
};

export const tags = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
