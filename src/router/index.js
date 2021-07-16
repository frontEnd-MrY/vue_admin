import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "view" */ '@/views/view.vue'),
        children: [
            {
                path: 'home',
                meta: { title: 'Home' },
                name: 'home',
                component: () => import(/* webpackChunkName: "not-found" */ '@/views/home.vue')
            },
            {
                path: '404',
                meta: { title: 'NotFound' },
                name: 'notFound',
                component: () => import(/* webpackChunkName: "not-found" */ '@/views/not-found.vue')
            }
        ]
    },
    {
        path: '/login',
        meta: { title: 'Login' },
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
    },
    {
        path: '*', // 此处需特别注意置于最底部
        redirect: '/404'
    }
];

const router = new VueRouter({
    routes
});

export default router;
