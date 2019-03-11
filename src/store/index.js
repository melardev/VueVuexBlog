import Vue from 'vue';
import Vuex from 'vuex';

import {articles} from './modules/articles.module';
import {auth} from './modules/auth.module';
import {notifications} from './modules/notifications.module';
import {tags} from './modules/tags.module';
import {categories} from './modules/categories.module';
import {comments} from "@/store/modules/comments.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth, notifications, articles, tags, categories, comments
    }
});
