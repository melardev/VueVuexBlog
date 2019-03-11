<template>
    <div class="container">
        {{message}}
        <router-link v-if="success" to="/">Go Home</router-link>
    </div>
</template>

<script>
    import {AuthAction} from "@/store/types.actions";
    import {mapActions} from "vuex";

    export default {
        name: "Logout",
        data() {
            return {
                message: '',
                success: false,
            }
        },
        mounted() {
            this.message = 'Trying to logout';
            this.logout().then(res => {
                this.message = 'Logged out successfully';
                this.success = true;
            });
        },
        methods: {
            ...mapActions('auth', {
                logout: AuthAction.remote.LOGOUT
            })
        }
    }
</script>

<style scoped>

</style>
