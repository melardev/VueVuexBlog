import {CommentAction, NotificationAction} from "@/store/types.actions";
import {ArticleAxiosService} from "@/services/remote/articles.axios.service";
import {CommentsAxiosService} from "@/services/remote/comments-axios.service";


const initialState = {};
const mutations = {};

const actions = {
    [CommentAction.remote.CREATE](context, payload) {
        return new Promise((resolve, reject) => {
            CommentsAxiosService.create(payload.slug, payload.content).then(res => {
                if (res.data.success) {
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Comment created!', {root: true});
                    return resolve({success: true, comment: res.data})
                }

                reject({success: false});
            }).catch(err => {
                reject({success: false});
            });
        });
    },
    [CommentAction.remote.DELETE](context, payload) {
        return ArticleAxiosService.delete(payload.slug, payload.commentId).then(() => {
            context.dispatch(CommentAction.FETCH_FROM_ARTICLE_SLUG, payload.slug);
        });
    },
};

const getters = {};


export const comments = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
