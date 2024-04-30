<template lang="">
    <nav class="sidebar" :class="{'close': !isOpen}">
        <header>
            <div class="image-text">
                <span class="image">
                    <img :src="user.avatar" alt="">
                </span>
                <div class="text logo-text">
                    <span class="name">{{ user.name }}</span>
                    <span class="profession">Web Developer</span>
                </div>
            </div>

            <i class="bx bx-chevron-right toggle" @click="handleToggle"></i>
        </header>
        <div class="menu-bar">
            <div class="menu">
                <!-- <li class="search-box">
                    <i class="bx bx-search icon"></i>
                    <input type="text" placeholder="Search...">
                </li> -->

                <ul class="menu-links">

                    <!-- <li class="nav-link">
                        <a href="#">
                            <i class="bx bx-home-alt icon"></i>
                            <span class="text nav-text">Dashboard</span>
                        </a>
                    </li> -->
                    <li class="nav-link" v-for="(item, index) in finalRoutes">
                        <router-link :to="item.children[0].path">
                            <a href="#" :class="{active: item.children[0].path === activeMenu}">
                                <svg-icon :icon-class="item.children[0].meta.icon" class-name="icon"/>
                                <span class="text nav-text">{{ item.children[0].meta.title }}</span>
                            </a>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="bottom-content">
                <li>
                    <a href="#" @click="handleLogout">
                        <!-- <i class="bx bx-log-out icon"></i> -->
                        <svg-icon icon-class="sign-out" class-name="icon" style="font-weight: 600;"/>
                        <span class="text nav-text">Logout</span>
                    </a>
                </li>
                <li class="mode">
                    <div class="sun-moon">
                        <i class="bx bx-moon icon moon"></i>
                        <i class="bx bx-sun icon sun"></i>
                    </div>
                    <span class="mode-text text">{{ isNightMode ? 'Light mode' : 'Dark mode'}}</span>
                    <div class="toggle-switch" @click="handleChangeMode">
                        <span class="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>
</template>
<script>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { confirmSnackbar, messageSnackbar } from '@/components/CustomerSnackbar'

export default {
    name: 'SideBar',
    setup() {
        const user = useUserStore()
        const router = useRouter()
        const route = useRoute()
        
        const isOpen = ref(false)
        const isNightMode = ref(true)

        const finalRoutes = computed(() => {
            // 过滤掉不用出现在菜单的路由
            return router.options.routes.filter(item => !item.hidden)
        })

        const activeMenu = computed(() => {
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        })
        
        function handleToggle() {
            isOpen.value = !isOpen.value
        }

        function handleChangeMode() {
            isNightMode.value = !isNightMode.value
        }

        function handleLogout() {
            confirmSnackbar({
                message: "确定退出嘛？"
            }).then(() => {
                messageSnackbar({ message: "退出成功!" })
                user.restAuthorization()
                router.push(`/login?redirect=${route.fullPath}`)
            })
        }

        return {
            isOpen,
            isNightMode,
            handleToggle,
            handleChangeMode,
            handleLogout,
            user,
            router,
            finalRoutes,
            activeMenu,
        }
    },
    mounted() {
        console.log(this.finalRoutes, 'router')
    }
}
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

/* 一些需要重复使用的样式 */
:root {
    /* 颜色 */
    --body-color: #e4e9f7;
    --sidebar-color: #fff;
    --sidebar-active-color: #a5cae5;
    --primary-color: #9c96e6;
    --primary-color-light: #f6f5ff;
    --toggle-color: #ddd;
    --text-color: #707070;

    /* 过渡效果 */
    --tran-02: all 0.2s ease;
    --tran-03: all 0.3s ease;
}

body{
    min-height: 100vh;
    background-color: var(--body-color);
    transition: var(--tran-03);
}

::selection{
    background-color: var(--primary-color);
    color: #fff;
}
/* 当body标签拥有dark类名的时候的样式 */
body.dark{
    --body-color:#18191a;
    --sidebar-color:#242526;
    --primary-color:#3a3b3c;
    --primary-color-light:#3a3b3c;
    --toggle-color:#fff;
    --text-color:#ccc;
}

.sidebar.close{
    width: 88px;
    .text{
        opacity: 0;
    }
}

/* sidebar上的初始化样式 */
.sidebar{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    padding: 10px 14px;
    background: var(--sidebar-color);
    transition: var(--tran-03);
    z-index: 100;
    li{
        height: 50px;
        list-style: none;
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .image{
        min-width: 60px;
        border-radius: 6px;
    }
    .icon{
        min-width: 60px;
        border-radius: 6px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    .text{
        font-size: 17px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 1;
    }
    .text, .icon{
        color: var(--text-color);
        transition: var(--tran-03);
    }
}

/* header部分样式 */

.sidebar header{
    position: relative;
}

.sidebar header .image-text{
    display: flex;
    align-items: center;
}

.sidebar header .logo-text{
    display: flex;
    flex-direction: column;
}

header .image-text .name{
    margin-top: 2px;
    font-size: 18px;
    font-weight: 600;
}

header .image-text .profession{
    font-size: 16px;
    margin-top: -2px;
    display: block;
}

.sidebar header .image{
    display: flex;
    align-items: center;
    justify-content: center;
}
.sidebar header .image img{
    width: 40px;
    border-radius: 6px;
}
.sidebar header .toggle{
    position: absolute;
    top: 50%;
    right: -25px;
    transform: translateY(-50%) rotate(180deg);
    height: 25px;
    width: 25px;
    background-color: var(--primary-color);
    color: var(--sidebar-color);
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    transition: var(--tran-03);
}

body.dark .sidebar header .toggle{
    color: var(--text-color);
}

.sidebar.close .toggle{
    transform: translateY(-50%) rotate(0deg);
}

.sidebar .menu{
    margin-top: 40px;
}

.sidebar li.search-box{
    border-radius: 6px;
    background-color: var(--primary-color-light);
    cursor: pointer;
    transition: var(--tran-03);
}
.sidebar li.search-box input{
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    background-color: var(--primary-color-light);
    color: var(--text-color);
    border-radius: 6px;
    font-size: 17px;
    font-weight: 500;
    transition: var(--tran-03);
}
.sidebar li a{
    list-style: none;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    text-decoration: none;
    transition: var(--tran-03);
}

.sidebar li a:hover{
    background-color: var(--primary-color);
}
.sidebar li .active {
    background-color: var(--sidebar-active-color);
}
.sidebar li a:hover .icon,.sidebar li a:hover .text{
    color: var(--sidebar-color);
}

body.dark .sidebar li a:hover .icon,
body.dark .sidebar li a:hover .text{
    color: var(--text-color);
}

.sidebar .menu-bar{
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
}

.menu-bar::-webkit-scrollbar{
    display: none;
}

.sidebar .menu-bar .mode{
    border-radius: 6px;
    background-color: var(--primary-color-light);
    position: relative;
    transition-timing-function: var(--tran-03);
}

.menu-bar .mode .sun-moon{
    height: 50px;
    width: 60px;
}
.mode .sun-moon i{
    position: absolute;
}

.mode .sun-moon i.sun{
    opacity: 0;
}
body.dark .mode .sun-moon i.sun{
    opacity: 1;
}
body.dark .mode .sun-moon i.moon{
    opacity: 0;
}

.menu-bar .bottom-content .toggle-switch{
    position: absolute;
    right: 0;
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
}

.toggle-switch .switch{
    position: relative;
    height: 22px;
    width: 40px;
    border-radius: 25px;
    background-color: var(--toggle-color);
    transition: var(--tran-03);
}
.switch::before{
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius:50% ;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background-color: var(--sidebar-color);
    transition: var(--tran-03);
}

body.dark .switch::before{
    left: 20px;
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
    left: 78px;
    height: 100vh;
    width: calc(100% - 78px);
}

body.dark .home .text{
    color: var(--text-color);
}
</style>