import {AuthAction, NotificationAction} from "@/store/types.actions";
import {AuthAxiosService} from "@/services/remote/auth-axios.service";
import {AxiosService} from "@/services/remote/base/axios.service";
import {UserService} from "@/services/local/user.service";

const state = {
    isLoggedIn: !!UserService.getUser(),
    user: UserService.getUser() || {},
    isRegistering: false,
    isLoggingIn: false,
    errors: {}
};

const mutations = {
    [AuthAction.local.SET_USER](state, user) {
        UserService.setUser(user);
        AxiosService.setUser(user);
        state.isLoggedIn = true;
        state.isLoggingIn = false;
        state.user = user;
        state.errors = {};
    },
    [AuthAction.local.LOGOUT](state) {
        UserService.logout();
        AxiosService.setUser({});
        state.isLoggedIn = false;
        state.user = {};
        state.errors = {};
    },
    [AuthAction.local.IS_LOGGING_IN](state, boolean) {
        state.isLoggingIn = boolean;
    },
    [AuthAction.local.IS_LOGGED_IN](state, boolean) {
        state.isLoggedIn = boolean;
    },
    [AuthAction.local.IS_REGISTERING](state, boolean) {
        state.isRegistering = boolean;
    },
    [AuthAction.local.REGISTER_SUCCESS](state, boolean) {
        state.isRegistering = false;
    },
};

const actions = {
    [AuthAction.remote.LOGIN](context, loginDto) {
        context.commit(AuthAction.local.IS_LOGGING_IN, true);
        return new Promise((resolve, reject) => {
            AuthAxiosService.login(loginDto)
                .then(({data}) => {
                    context.commit(AuthAction.local.IS_LOGGING_IN, false);
                    if (data.success) {
                        context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Logged in successfully', {root: true});
                        data.user.token = data.token;
                        context.commit(AuthAction.local.SET_USER, data.user);
                    }
                    resolve(data);
                })
                .catch(({response}) => {
                    debugger;
                    context.commit(AuthAction.local.LOGIN_FAILURE, response.data.errors);
                    context.commit(AuthAction.local.IS_LOGGING_IN, false);
                    reject(response);
                });
        });
    },

    [AuthAction.remote.LOGOUT](context) {
        return new Promise((resolve, reject) => {
            context.commit(AuthAction.local.LOGOUT);
            context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Logged out successfully', {root: true});
            resolve({success: true});
        });
    },

    [AuthAction.remote.REGISTER](context, registerDto) {
        context.commit(AuthAction.local.IS_REGISTERING, true);
        return new Promise((resolve, reject) => {
            AuthAxiosService.create(registerDto)
                .then(({data}) => {
                    if (data.success) {
                        context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Registered successfully', {root: true});
                        context.commit(AuthAction.local.IS_REGISTERING, false);
                        context.commit(AuthAction.local.REGISTER_SUCCESS, data);
                    }
                    resolve(data);
                })
                .catch(({response}) => {
                    debugger;
                    context.commit(AuthAction.local.IS_REGISTERING, false);
                    context.commit(AuthAction.local.REGISTER_FAILURE, response.data.errors);
                    context.commit(`notifications/${NotificationAction.SHOW_TOAST_ERROR}`, 'Error registering', {root: true});
                    reject(response.data);
                });
        });
    },
};

const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    isAdmin: state => state.user && state.user.isAdmin,
    isAuthor: state => state.user && state.user.isAuthor,
    currentUser: (state) => state.user
};

export const auth = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
