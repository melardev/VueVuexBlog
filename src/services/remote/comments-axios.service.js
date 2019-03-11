import {AxiosService} from "@/services/remote/base/axios.service";

export const CommentsAxiosService = {
    get(slug) {
        if (typeof slug !== "string") {
            throw new Error(
                "[RWV] CommentsAxiosService.get() article slug required to fetch comments"
            );
        }
        return AxiosService.get("articles", `${slug}/comments`);
    },

    create(slug, content) {
        return AxiosService.post(`articles/${slug}/comments`, {
            content
        });
    },

    delete(slug, commentId) {
        return AxiosService.delete(`articles/${slug}/comments/${commentId}`);
    }
};
