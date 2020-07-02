<template>

    <div id="wrapper">

<!--        sidebar component for admin dashboard-->
        <sidebar/>
<!--        sidebar component end here and is store in layout folder-->

    <div id="page-content-wrapper">

        <div id="content">

            <navbar></navbar>

        <div class="app-content">
            <div class="app-header">
                <div class="app-title">
                    <h4>Welcome to Student Dashboard</h4>
                </div>

                <div class="app-option ml-md-auto">
                    <div class="app-search">
                        <input class="form-control" type="text" placeholder="Search here..">
                    </div>
                </div>
            </div>
            <div class="dashboard-page">
                <div class="container">
                </div>
            </div>
        </div>
    </div>
    </div>

    </div>
</template>

<script>
    import sidebar from "@/layout/components/sidebar";
    import navbar from "../../layout/components/navbar"

    export default {
        name: "Dashboard",
        components: { sidebar, navbar },
        data(){
            return{

            }
        },
        mounted() {
            if (localStorage.getItem('reloaded')) {
                // The page was just reloaded. Clear the value from local storage
                // so that it will reload the next time this page is visited.
                localStorage.removeItem('reloaded');
            } else {
                // Set a flag so that we know not to reload the page twice.
                localStorage.setItem('reloaded', '1');
                location.reload();
            }
        }

    }
</script>

<style scoped>
</style>
