<template>
    <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-4">
            <form id="register-form" role="form">
                <h3 class="text-center">Register</h3>
                <div class="form-group">
                    <label class="control-label" for="first_name">First name</label>
                    <input type="text" name="first_name" id="first_name" class="form-control" placeholder="First name"
                           value=""
                           v-model="first_name">
                </div>
                <div class="form-group">
                    <label class="control-label" for="last_name">Last name</label>
                    <input type="text" name="last_name" id="last_name" class="form-control" placeholder="Last name"
                           value=""
                           v-model="last_name">
                </div>
                <div class="form-group">
                    <label class="control-label" for="username">Username</label>
                    <input type="text" name="username" id="username" class="form-control" placeholder="Username"
                           value=""
                           v-model="username">
                </div>
                <div class="form-group">
                    <label class="control-label" for="email">Email</label>
                    <input type="email" name="email" id="email" class="form-control" placeholder="Email Address"
                           value=""
                           v-model="email">
                </div>
                <div class="form-group">
                    <label class="control-label" for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password"
                           v-model="password">
                </div>
                <div class="form-group">
                    <label class="control-label" for="password">Password Confirmation</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control"
                           placeholder="Password confirmation"
                           v-model="password_confirmation">
                </div>
                <div class="form-group">
                    <button class="btn btn-success" style="width: 100%" @click.prevent="submitRegisterForm"
                            :disabled="isLoading">
                        <i v-if="isLoading" class="fa fa-spinner fa-spin">
                        </i>
                        Register
                    </button>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <router-link to="/login"><a>Login</a></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';
    import {AuthAction} from "@/store/types.actions";
    import {NotificationAction} from "@/store/types.actions";

    export default {
        data() {
            return {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: '',
                password_confirmation: '',
                isLoading: false
            };
        },
        methods: {
            ...mapActions('auth', {registerUser: AuthAction.remote.REGISTER}),
            submitRegisterForm() {
                this.isLoading = true;
                let data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                };
                this.registerUser(data).then((res) => {
                    this.isLoading = false;
                    if (res.success) {
                        this.$router.push('/login');
                    }
                }).catch((error) => {
                    debugger
                });
            }
        }
    }
</script>
