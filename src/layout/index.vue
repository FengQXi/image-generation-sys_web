<template>
    <div class="layout">
        <sidebar class="sidebar-container" />
        <section class="home">
            <navbar class="navbar" />
            <app-main />
        </section>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
}
</script>

<style lang="scss">
.layout {
    // width: 100vh;
    // height: 100vw;
}
.home{
    position: absolute;
    top: 0;
    left: 250px;
    height: 100vh;
    width: calc(100% - 250px);
    background-color: var(--body-color);
    transition: var(--tran-03);
}

.home .text{
    font-size: 30px;
    font-weight: 500;
    color: var(--text-color);
    padding: 12px 60px;
}

.sidebar.close~.home{
    left: 88px;
    height: 100vh;
    width: calc(100% - 88px);
}

body.dark .home .text{
    color: var(--text-color);
}

.navbar {
    width: 100%;
    height: 70px;
    margin: 0 10px;
}
</style>