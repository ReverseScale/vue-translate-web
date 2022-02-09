import Vue from 'vue'
import Router from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import HomeRoot from '@/views/RootContainer.vue';

export default new Router({
    routes: [{
        path: "/",
        name: "home",
        redirect: "/login",
    },{
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("@/views/login/Login.vue")
    }, {
        path: '/',
        name: 'Home',
        redirect: '/home',
        component: HomeRoot,
        children: [ {
            path: "/home",
            name: "TranslateList",
            meta: {
                paths: [{
                    title: '首页',
                    path: '/'
                }, {
                    title: '国际化翻译系统'
                }],
            },
            component: () =>
                import ( /* webpackChunkName: "home" */ './views/translate/Translate.vue'),
        }, {
            path: "/translate/tools",
            name: "TranslateTools",
            meta: {
                paths: [{
                    title: '首页',
                    path: '/'
                }, {
                    title: '翻译工具下载'
                }],
            },
            component: () =>
                import ( /* webpackChunkName: "home" */ './views/translate/TranslateTools.vue'),
        }, {
            path: "/translate/modules",
            name: "TranslateModules",
            meta: {
                paths: [{
                    title: '首页',
                    path: '/'
                }, {
                    title: '翻译模块配置'
                }],
            },
            component: () =>
                import ( /* webpackChunkName: "home" */ './views/translate/TranslateModules.vue'),
        }]
    }]
})

