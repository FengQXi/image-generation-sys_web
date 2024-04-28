<template lang="">
    <nav class="menu" :class="{'open': isOpen}">
        <div class="actionsBar">
            <div class="menuBtn" id="menuBtn" @click="handleToggle">
                <SvgIcon class="svgIcon" icon-class="menu"></SvgIcon>
            </div>
            <h3 class="menuText" :class="{'openText': isOpen}">FengQX</h3>
        </div>
        <ul class="optionsBar">
            <li class="menuItem">
                <a href="#" class="menuOption">
                    <SvgIcon class="svgIcon" icon-class="home"></SvgIcon>
                    <h5 class="menuText" :class="{'openText': isOpen}">首页</h5>
                </a>
            </li>
            <li class="menuBreak">
                <hr>
            </li>
            <li class="menuItem">
                <a href="#" class="menuOption">
                    <SvgIcon class="svgIcon" icon-class="eye-open"></SvgIcon>
                    <h5 class="menuText downList" :class="{'openText': isOpen}">图片</h5>
                </a>
            </li>
            <li class="menuItem">
                <a href="#" class="menuOption">
                    <SvgIcon class="svgIcon" icon-class="eye-open"></SvgIcon>
                    <h5 class="menuText downList" :class="{'openText': isOpen}">收藏</h5>
                </a>
            </li>
            <li class="menuItem">
                <a href="#" class="menuOption">
                    <SvgIcon class="svgIcon" icon-class="eye-open"></SvgIcon>
                    <h5 class="menuText downList" :class="{'openText': isOpen}">首页</h5>
                </a>
            </li>
        </ul>
        <div class="about" id="about"></div>
        <div class="menuUser">
            <a href="#">
                <div>
                    <img src="../assets/pikapika.png" alt="">
                </div>
                <h5 class="userName menuText" :class="{'openText': isOpen}">FengQX</h5>
                <p class="menuText" :class="{'openText': isOpen}">
                    <SvgIcon class="svgIcon" icon-class="arrow-right"></SvgIcon>
                </p>
                <div class="userInfo">
                    我的名字叫 神
                </div>
            </a>
        </div>
        <div class="themeBar">
            <div>
                <button type="button">
                    <SvgIcon class="svgIcon" icon-class="sign-out"></SvgIcon>
                </button>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'TestView',
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        handleToggle() {
            this.isOpen = !this.isOpen
        }
    }
}
</script>
<style scoped lang="scss">
    .svgIcon {
        font-size: 20px;
    }

    .menu {
        position: absolute;
        width: 60px;
        height: 600px;
        background-color: #111727;
        z-index: 2;
        top: 0px;
        bottom: 0px;
        left: 10px;
        margin: auto;
        padding: 0px;
        border-radius: 0.8rem;
        transition: 0.3s ease 0.15s;
        font-family: sans-serif;
        a {
            text-decoration: none;
        }
        .actionsBar {
            width: 100%;
            height: 10%;
            padding: 0.5rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 0.5rem;
            transition: 0.3s ease;
            .menuBtn {
                width: 45px;
                height: 45px;
                border-radius: 0.5rem;
                transition: 0.3s ease;
                line-height: 45px;
                text-align: center;
                .svgIcon {
                    background-color: transparent;
                    color: #fff;
                }
                &:hover {
                    background-color: #364152;
                }
            }
            .menuText {
                margin-right: 70px;
                width: 80px;
            }
        }
        .optionsBar {
            overflow: hidden;
            display: flex;
            height: 60%;
            width: 100%;
            padding: 0 0.5rem;
            align-items: center;
            flex-direction: column;
            .menuItem {
                width: 100%;
                height: 45px;
                margin: 0.3rem;
                .menuOption {
                    font-size: 1rem;
                    background-color: transparent;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    border-radius: 0.5rem;
                    transition: 0.3s ease;
                    &:hover {
                        background-color: #364152;
                    }
                    .svgIcon {
                        width: 45px;
                        text-align: center;
                        color: #fff;
                    }
                    .menuText {
                        width: calc(100% - 45px);
                        text-align: start;
                    }
                    .downList {
                        text-align: center;
                    }
                }
            }
            .menuBreak {
                width: 100%;
                height: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                hr {
                    width: 70%;
                    height: 3px;
                    background-color: #fff;
                    border: none;
                    border-radius: 5px;
                }
            }
        }
        .about {
            width: 100%;
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 1rem;
            flex-direction: column;
            font-family: sans-serif;
            opacity: 0;
            white-space: nowrap;
            transition: 0.3s ease 0.15s;
        }
        .menuUser {
            width: 100%;
            height: 10%;
            a {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-decoration: none;
                padding: 0.5rem;
                text-decoration: relative;
                div {
                    width: 45px;
                    height: 45px;
                    position: relative;
                    border-radius: 0.5rem;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 0.5rem;
                    }
                }
                .userName {
                    width: calc(70% - 45px);
                    font-size: 1rem;
                }
                p {
                    width: calc(30% - 45px);
                }
                &:hover p {
                    animation: animArrow 0.3s ease 2;
                }
            }
            .userInfo {
                position: absolute;
                width: 20rem;
                height: 18rem;
                opacity: 0;
                pointer-events: none;
                top: 34%;
                left: 1.5rem;
                transition: 0.3s ease;
                transform: scale(0);
                transform-origin: bottom left;
                background-color: #4a8387;
            }
            &:hover .userInfo {
                pointer-events: all;
                opacity: 1;
                transform: scale(1);
            }
        }
        .themeBar {
            overflow: hidden;
            width: 100%;
            height: 10%;
            padding: 0.5rem;
            div {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                border-radius: 0.5rem;
                transition: 0.3s ease;
                background-color: #214275;
                button {
                    background-color: transparent;
                    outline: none;
                    border: none;
                    border-radius: 0.5rem;
                    color: #fff;
                    width: 100%;
                    height: 45px;
                    transition: 0.3s ease;
                    font-size: 1rem;
                    &:hover {
                        background-color: #47227a;
                    }
                }
            }
        }
    }

    .menuText {
        color: rgba(255, 255, 255, 0.8);
        transform: translateX(-250px);
        opacity: 0;
        transition: transform 0.3s ease 0.1s;
    }

    .open {
        width: 240px;
    }

    .openText {
        opacity: 1;
        transform: translateX(0);
    }

    @keyframes animArrow {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>