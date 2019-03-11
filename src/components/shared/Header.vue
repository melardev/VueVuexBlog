<template>
    <nav role="navigation" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <!--  Side nav -->
        <div id="sideNav" class="container" ref="sideNav">
            <router-link class="navbar-brand" to="/">Vue + Vuex Blog</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li v-if="isAdmin || isAuthor">
                        <router-link class="nav-link" to="/articles/new">Create</router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link class="nav-link" to="/profile">Profile</router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link class="nav-link" to="/profile">Profile</router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link class="nav-link" to="/logout">Logout</router-link>
                    </li>
                    <li v-else class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li v-if="!isLoggedIn" class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {AuthAction} from "@/store/types.actions";

    export default {
        name: "Header",
        computed: {
            ...mapGetters('auth', [
                'isLoggedIn', 'isAuthor', 'isAdmin',
            ]),
        },
        methods: {
            ...mapActions('auth', {
                logout: AuthAction.remote.LOGOUT
            })
        },
    }
</script>

<style scoped lang="scss">
    // @import "../styles/home";
</style>
