export const ArticleAction = {
    remote: {
        FETCH_ALL: 'FETCH_ARTICLES',
        FETCH_BY_ID: 'FETCH_BY_ID',
        FETCH_BY_SLUG: 'FETCH_BY_SLUG',
        UPDATE: 'UPDATE',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
        LIKE: 'LIKE',
        UNLIKE: 'UNLIKE'
    },
    local: {
        SET_ARTICLES: 'SET_ARTICLES',
        SET_ARTICLE: 'SET_ARTICLE',
        SET_IS_LOADING: 'SET_IS_LOADING',
    }
};

export const CommentAction = {
    remote: {
        FETCH_FROM_ARTICLE_SLUG: 'FETCH_FROM_ARTICLE_SLUG',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
    },
    local: {
        SET_COMMENTS: 'SET_COMMENTS',
    }
};

export const NotificationAction = {
    SHOW_TOAST_SUCCESS: 'SHOW_TOAST_SUCCESS',
    SHOW_TOAST_ERROR: 'SHOW_TOAST_ERROR',
    CLEAR_TOAST: 'CLEAR_TOAST',

    SHOW_ALERT_SUCCESS: 'SHOW_ALERT_SUCCESS',
    SHOW_DIALOG_ERROR: 'SHOW_DIALOG_ERROR',
    CLEAR_DIALOG: 'CLEAR_DIALOG'
};

export const AuthAction = {
    remote: {
        LOGIN: 'LOGIN',
        REGISTER: 'REGISTER',
        UPDATE_USER: 'UPDATE_USER',
        IS_VALID_TOKEN: 'IS_VALID_TOKEN',
        LOGOUT: 'LOGOUT',
    },
    local: {
        SET_USER: 'SET_USER',

        IS_REGISTERING: 'IS_REGISTERING',
        REGISTER_SUCCESS: 'REGISTER_SUCCESS',
        REGISTER_FAILURE: 'REGISTER_FAILURE',

        IS_LOGGING_IN: 'IS_LOGGING_IN',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_FAILURE: 'LOGIN_FAILURE',
        IS_LOGGED_IN: 'IS_LOGGED_IN',

        LOGOUT: 'LOGOUT',
    }
};

export const TagAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
    }, local: {
        SET_IS_LOADING: 'SET_IS_LOADING',
        SET_TAGS: 'SET_TAGS',
    }
};

export const CategoryAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
    }, local: {
        SET_IS_LOADING: 'SET_IS_LOADING',
        SET_CATEGORIES: 'SET_CATEGORIES',
    }
};
