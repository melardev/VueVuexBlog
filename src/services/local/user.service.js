import {AxiosService} from "@/services/remote/base/axios.service";
import {AuthAxiosService} from "@/services/remote/auth-axios.service";
import {LocalStorageService} from "@/services/local/base/local-storage.service";

const USER_KEY = 'user';


function hasRole(user, roleName) {
    if (!user)
        user = getUser();

    if (user == null)
        return false;

    return user.roles && user.roles.findIndex(role => role === roleName) !== -1;
}

function getUser() {
    return JSON.parse(LocalStorageService.get(USER_KEY));
}

function isAdmin(user) {
    return hasRole(user, 'ROLE_ADMIN');
}

function isNotAdmin() {
    return !isAdmin();
}

function isAuthor(user) {
    return hasRole(user, 'ROLE_AUTHOR')
}

function addUserExtrafields(user) {
    user.isAdmin = isAdmin(user);
    user.isAuthor = isAuthor(user);
    return user;
}

export const UserService = {

    login(loginDto) {
        return AuthAxiosService.login(loginDto)
    },
    register(userObject) {
        return AuthAxiosService.register(userObject);
    },

    logout() {
        LocalStorageService.clear(USER_KEY);
    },

    setUser(user) {
        LocalStorageService.set(USER_KEY, JSON.stringify(user));
        return addUserExtrafields(user);
    },

    init() {
        const user = getUser();
        if (user && user.username) {
            addUserExtrafields(user);
            AxiosService.setUser(user);
        }
    },

    getToken() {
        const user = LocalStorageService.get(USER_KEY);
        return user ? user.token : null;
    },

    saveUser(user) {
        LocalStorageService.set(USER_KEY, JSON.stringify(user));
    },

    isAuthenticated() {
        return this.getToken() && this.getUser()
    },

    isNotAuthenticated() {
        return !this.isAuthenticated();
    },

    isAdmin, isNotAdmin,
    getUser,
};
