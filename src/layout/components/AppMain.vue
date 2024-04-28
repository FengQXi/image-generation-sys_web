<template lang="">
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>
<script>
export default {
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path
        }
    }
}
</script>
<style lang="css">
.app-main {
    margin: 10px;
    width: 100%;
    height: calc(100vh - 90px);
    overflow: hidden;
}
</style>