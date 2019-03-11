import {NotificationAction} from "@/store/types.actions";

const state = {
    showToast: false,
    showDialog: false,
    isLoading: [],
    toast: {
        message: '',
        className: ''
    },
    dialog: {
        message: '',
        type: ''
    },
};

const mutations = {

    SHOW_MODAL: (state) => {
        state.showModal = !state.showModal;
    },
    SHOW_POPUP_CART: (state) => {
        state.showPopupCart = !state.showPopupCart;
    },
    'CLEAR_MESSAGE'(state) {
        state.messageGroup = {
            messageClass: '',
            message: ''
        }
    },
    'SET_IS_LOADING'(state, bool) {
        if (bool)
            state.isLoading.push(true);
        else
            state.isLoading.pop();
    },
    'SET_ERROR'(state, err) {
        state.messages.message = err;
    },
    [NotificationAction.SET_TOAST_MESSAGE](state, messageObj) {
        state.showToast = true;
        state.toast.message = messageObj.message;
        state.toast.className = messageObj.className;
    },
    [NotificationAction.SHOW_TOAST_SUCCESS](state, message) {
        state.toast = {className: 'alert alert-success', message};
    },
    [NotificationAction.SHOW_TOAST_ERROR](state, message) {
        state.toast = {className: 'alert alert-danger', message};
    },
    [NotificationAction.CLEAR_TOAST](state) {
        state.toast = {message: '', className: ''};
    },
    [NotificationAction.SHOW_ALERT_SUCCESS](state, message) {
        state.dialog = {className: 'alert alert-success', message};
    },
    [NotificationAction.SHOW_DIALOG_ERROR](state, message) {
        state.dialog = {className: 'alert alert-danger', message};
    },
    [NotificationAction.CLEAR_DIALOG](state) {
        state.dialog = {message: '', className: ''};
    }
};

const actions = {
    showOrHiddenModal: (context) => {
        context.commit('SHOW_MODAL');
    },
    clearMessage({commit}) {
        commit('CLEAR_MESSAGE');
    }
};

const getters = {
    getShowToast: state => state.showToast,
    getShowDialog: state => state.showDialog,
    isAppLoading: state => state.isLoading,


    getToast: (state) => state.toast,
    getToastMessage: (state) => state.toast.message,
    getToastClass: (state) => state.toast.className,

    getDialog: (state) => state.dialog,
    getDialogMessage: (state) => state.dialog.message,
    getDialogType: (state) => state.type,
};

export const notifications = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
