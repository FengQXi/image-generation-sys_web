<template lang="">
    <nav class="sidebar" :class="{'close': !isOpen}">
        <header>
            <div class="image-text">
                <span class="image">
                    <img src="@/assets/image.png" alt="">
                </span>
                <div class="text logo-text">
                    <span class="name">Phoenix</span>
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

                    <li class="nav-link">
                        <a href="#">
                            <i class="bx bx-home-alt icon"></i>
                            <span class="text nav-text">Dashboard</span>
                        </a>
                    </li>

                    <!-- 下面的小li都是一样的样式，只需要修改文字和图标 -->
                    <!-- <li class="nav-link">
                        <a href="#">
                            <i class='bx bx-bar-chart-alt-2 icon'></i>
                            <span class="text nav-text">Revenue</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <i class='bx bx-bell icon'></i>
                            <span class="text nav-text">Notifications</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <i class='bx bx-pie-chart-alt icon'></i>
                            <span class="text nav-text">Analytics</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <i class='bx bx-heart icon'></i>
                            <span class="text nav-text">Likes</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <i class='bx bx-wallet icon'></i>
                            <span class="text nav-text">Wallets</span>
                        </a>
                    </li> -->
                </ul>
            </div>
            <div class="bottom-content">
                <li>
                    <a href="#">
                        <i class="bx bx-log-out icon"></i>
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
export default {
    name: 'SideBar',
    data() {
        return {
            isOpen: false,
            isNightMode: true,
        }
    },
    computed: {
        routes() {
            // 遍历user store中的finalRoutes
            return this.$router.options.routes
            // return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
    },
    methods: {
        handleToggle() {
            this.isOpen = !this.isOpen
        },
        handleChangeMode() {
            this.isNightMode = !this.isNightMode
        }
    },
    mounted() {
        console.log(this.routes);
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
    --primary-color: #695cfe;
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
}

.sidebar.close{
    width: 88px;
}

.sidebar li{
    height: 50px;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.sidebar header .image,.sidebar .icon{
    min-width: 60px;
    border-radius: 6px;
}

.sidebar .icon{
    min-width: 60px;
    border-radius: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.sidebar .text,.sidebar .icon{
    color: var(--text-color);
    transition: var(--tran-03);
}

.sidebar .text{
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 1;
}

.sidebar.close .text{
    opacity: 0;
    
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

// .home{
//     position: absolute;
//     top: 0;
//     left: 250px;
//     height: 100vh;
//     width: calc(100% - 250px);
//     background-color: var(--body-color);
//     transition: var(--tran-03);
// }

// .home .text{
//     font-size: 30px;
//     font-weight: 500;
//     color: var(--text-color);
//     padding: 12px 60px;
// }

// .sidebar.close~.home{
//     left: 78px;
//     height: 100vh;
//     width: calc(100% - 78px);
// }

// body.dark .home .text{
//     color: var(--text-color);
// }
</style>