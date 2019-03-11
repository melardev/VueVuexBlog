<template>
    <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
            <form id="login-form" role="form" style="display: block;">
                <h3 class="text-center">Login</h3>
                <div class="form-group">
                    <input type="email" name="email" id="email" class="form-control" placeholder="Username"
                           v-model="username">
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password"
                           v-model="password">
                </div>

                <div class="form-group">
                    <button class="btn btn-success" style="width: 100%" @click.prevent="submitLoginForm"
                            :disabled="isLoading">
                        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                        Log in
                    </button>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <router-link to="/register"><a>Register</a></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from 'vuex';
    import {AuthAction} from "@/store/types.actions";
    import {NotificationAction} from "@/store/types.actions";

    export default {
        data() {
            return {
                username: '',
                password: '',
                isLoading: false
            }
        },
        mounted() {
            if (this.isLoggedIn) {
                this.$router.push('/');
            }
        },
        computed: {
            ...mapGetters('auth', ['isLoggedIn'])
        },
        methods: {
            ...mapActions('auth', {login: AuthAction.remote.LOGIN}),
            ...mapMutations('notifications', {
                setIsLoading: NotificationAction.SET_IS_LOADING,
            }),
            submitLoginForm() {
                this.isLoading = true;

                let credentials = {
                    username: this.username,
                    password: this.password
                };

                this.login(credentials).then((data) => {
                    this.isLoading = false;
                    if (data.success)
                        this.$router.push('/');
                }).catch(err => {
                    debugger;
                    this.isLoading = false;
                });
            }
        }
    }
</script>
