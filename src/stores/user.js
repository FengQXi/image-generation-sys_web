import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth.js'
import { getUserInfo } from '@/api/user'

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

        async getUserInfo() {
            const id = getUserId()
            if (id) {
                try {
                    const { data, code } = await getUserInfo(id)
                    if(code === 200) {
                        this.$patch({
                            name: data.username,
                            routes: data.permission,
                        })
                    }
                    else {
                        return Promise.reject(data.msg)
                    }
                } catch (error) {
                    console.log(error)
                    return Promise.reject(error)
                }
            }
            else {
                return Promise.reject('未登录')
            }
        },

        restUserInfo() {
            this.$patch({
                name: '',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                routes: [], // 服务器返回的菜单信息
                finalRoutes: [], // 通过用户信息，计算出来的异步路由
                token: '',
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

        setAuthorization(auth) {
            const { token, id } = auth
            setToken(token)
            setUserId(id)
            this.$patch({
                token: token,
            })
        },

        restAuthorization() {
            removeToken()
            this.restUserInfo()
        }
    },
})
