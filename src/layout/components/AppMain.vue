<template lang="">
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <transition>
                <keep-alive :include="['GenerateImage']">
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
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
    overflow: auto;
    border-radius: 10px;
}
</style>