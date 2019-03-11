import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import router from './router/router';
import {UserService} from './services/local/user.service';
import {AuthAction} from "@/store/types.actions";
import Toasted from 'vue-toasted';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.config.productionTip = false;

UserService.init();
const user = UserService.getUser();
if (user && user.username) {
    store.commit('auth/' + AuthAction.local.SET_USER, user);
}

Vue.use(Toasted);
Vue.use(CKEditor);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
