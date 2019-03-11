import {ArticleAction, NotificationAction, CommentAction} from "@/store/types.actions";
import {ArticleAxiosService} from "@/services/remote/articles.axios.service";

const initialState = {
    isLoading: false,
    pageMeta: {},
    selectedArticle: {},
    articles: [],
    comments: {
        pageMeta: {},
        data: []
    }
};

const mutations = {
    [ArticleAction.local.SET_IS_LOADING](state, isLoading) {
        state.isLoading = isLoading;
    },
    'SET_ARTICLES'(state, data) {
        state.articles = data.articles;
        state.pageMeta = data.pageMeta;
    },
    [ArticleAction.local.SET_ARTICLE](state, article) {
        state.selectedArticle = article;
    },
    [CommentAction.local.SET_COMMENTS](state, comments) {
        state.comments = comments;
    },
    [ArticleAction.local.TAG_ADD](state, tag) {
        state.article.tagList = state.article.tagList.concat([tag]);
    },
    [ArticleAction.local.TAG_REMOVE](state, tag) {
        state.article.tagList = state.article.tagList.filter(t => t !== tag);
    },
    [ArticleAction.local.RESET_STATE]() {
        for (let f in state) {
            Vue.set(state, f, initialState[f]);
        }
    }
};

const actions = {
    [ArticleAction.remote.FETCH_ALL]({commit}, query) {
        commit(ArticleAction.local.SET_IS_LOADING, true);
        return new Promise(resolve => {
            commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return ArticleAxiosService.fetchAll(query).then(response => {
                if (response.data.success) {
                    commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Articles fetched!', {root: true});
                    commit(ArticleAction.local.SET_ARTICLES, {
                        pageMeta: response.data.page_meta,
                        articles: response.data.articles
                    });
                    resolve(response.data);
                }
            }).catch(err => {
                debugger;
                commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                commit(`notifications/${NotificationAction.SHOW_TOAST_ERROR}`, err.message, {root: true});
            });
        });
    },

    [ArticleAction.remote.FETCH_BY_SLUG](context, articleSlug) {
        context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
        return new Promise((resolve, reject) => {
            return ArticleAxiosService.fetchBySlug(articleSlug).then(({data}) => {
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Article fetched!', {root: true});
                // context.commit(CommentAction.local.SET_COMMENTS, data.comments);
                context.commit(ArticleAction.local.SET_ARTICLE, data);
                delete data.success;
                delete data.full_messages;
                resolve({success: true, article: data});
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(`notifications/${NotificationAction.SET_ERROR}`, err.message, {root: true});
                reject({success: false})
            });
        });
    },

    [ArticleAction.remote.CREATE]({state}) {
        return ArticleAxiosService.create(state.article);
    },
    [ArticleAction.remote.DELETE](context, slug) {
        return ArticleAxiosService.destroy(slug);
    },
    [ArticleAction.remote.UPDATE]({state}) {
        return ArticleAxiosService.update(state.article.slug, state.article);
    },

    // Comments




    // Likes
    [ArticleAction.remote.LIKE](context, payload) {
        return ArticleAxiosService.like(payload).then(({data}) => {
            // Update list as well. This allows us to favorite an article in the Home view.
            context.commit(UPDATE_ARTICLE_IN_LIST, data.article, {root: true});
            context.commit(ArticleAction.SET_ARTICLE, data.article);
        });
    },
    [ArticleAction.remote.UNLIKE](context, slug) {
        return ArticleAxiosService.unlike(slug).then(({data}) => {
            if (data.success) {
                // Update list as well. This allows us to favorite an article in the Home view.
                // context.commit(UPDATE_ARTICLE_IN_LIST, data.article, {root: true});
                context.commit(ArticleAction.local.SET_ARTICLE, data.article);
            } else {
                // dispatch error;
                context.commit(NotificationAction.SET_ERROR, data.full_messages);
            }
        });
    },

};

const getters = {
    getArticles: state => state.articles,
    getSelectedArticle: state => state.selectedArticle,
    getPageMeta: state => state.pageMeta,
    getComments: state => state.comments,
};

export const articles = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
