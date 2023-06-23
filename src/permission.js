import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from './utils/getPageTitle'

nProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
    nProgress.start()

    document.title = getPageTitle(to.meta.title)
    next()
})

router.afterEach(() => {
    nProgress.done()
})