<template>
    <div id="app">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap" rel="stylesheet">
        <keep-alive>
        <router-view :key="$route.fullPath"/>
        </keep-alive>

        <notifications group="alert-message" :max="3" position="top right" style="padding-top: 10px"/>
    </div>
</template>

<script>
    import './js/main'
    export default {}
</script>

<style scoped>

    .notification-title {
        font-family: sans-serif;
        font-size: 13px;
    }

    .notification-content {
        font-family: sans-serif;
        font-size: 13px;
    }
</style>

