import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from './utils/getPageTitle'
import { getToken } from '@/utils/auth' // get token from cookie
import { useUserStore } from '@/stores/modules/user'
import { messageSnackbar } from '@/components/CustomerSnackbar/index'

const whiteList = ['/login', '/404'] // no redirect whitelist

nProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
    
    const user = useUserStore()

    nProgress.start()

    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            
            if (user.name) {
                next()
            } else {
                try {
                    // get user info
                    await user.getUserInfo()

                    next({ ...to }) // 解决不在首页退出登录后登下一个账号白页问题
                } catch (error) {
                    // remove token and go to login page to re-login
                    await user.restAuthorization()
                    // 这里要调用组件提示
                    // Message.error(error || 'Has Error')
                    messageSnackbar({ message: error, color: 'error' })
                    console.log(error);
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    nProgress.done()
})