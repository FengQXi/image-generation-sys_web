import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth.js'
import { login } from '@/api/user'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: '',
        name: '',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        routes: [], // 服务器返回的菜单信息
        finalRoutes: [], // 通过用户信息，计算出来的异步路由
    }),

    actions: {
        logout() {
            // remove token
            removeToken()
            this.restUserInfo()
        },

        restUserInfo() {
            this.$patch({
                name: '',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                routes: [], // 服务器返回的菜单信息
                finalRoutes: [], // 通过用户信息，计算出来的异步路由
            })
        },

        setUserInfo(userInfo) {
            const { token, username } = userInfo
            // set token
            setToken(token)
            this.$patch({
                name: username,
                token: token,
            })
        },
    },
})
