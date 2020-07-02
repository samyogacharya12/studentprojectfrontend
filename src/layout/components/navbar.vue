<template>
    <!--Navbar -->
    <nav class="mb-1 navbar navbar-expand-lg">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content"
                aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-content">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">
                        <i class="fa fa-bell" aria-hidden="true"></i>
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa fa-envelope" aria-hidden="true"></i></a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbar-dropdown" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user"></i></a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbar-dropdown">
                        <a class="dropdown-item" href="#"><i class="fas fa-users-cog"></i> My account</a>
                        <a class="dropdown-item" @click="handleLogout"><i class="fas fa-sign-out-alt"></i> Log out</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <!--/.Navbar -->
</template>

<script>
    import Vue from 'vue'
    import {removeRole, removeUsername} from "../../utils/auth";
    import $ from 'jquery'

    export default {
        name: "Navbar",

        methods: {
            handleLogout() {
                this.$store.dispatch('user/logout').then(() => {
                    this.loggedIn = false
                    removeUsername();
                    this.$router.push('login')
                    Vue.notify({
                        group: 'alert-message',
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully Logged Out'
                    })
                })
            }
        },
    }
</script>

<style scoped>
    .navbar{
        background-color: #f6f6f4;
        cursor: pointer;
        margin-right: 1rem;
        /*border-bottom: 1px solid #bbb;*/
        /*height: 40px*/
    }
    .nav-link{
        color: rgba(0, 0, 0, 0.6);
    }

    #navbar-dropdown{
        color: rgba(0, 0, 0, 0.6);
    }
</style>
