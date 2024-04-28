/* Layout */
import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        meta: { title: '关于' }
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/TestView2.vue'),
        meta: { title: '测试' }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('../views/AboutView.vue'),
            meta: { title: '首页', icon: 'dashboard' }
        }],
    },

    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true } // have some questions
]