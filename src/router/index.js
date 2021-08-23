import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

// module.exports = {
//     dev:{
//         assetsSubDirectory: 'static',
//         assetsPublicPath: '/',
//         proxyTable: {
//             '/leyuna':{
//                 target: 'http://127.0.0.1:9000',
//                 changOrigin: true,
//                 secure: false
//             }
//         }
//     }
// }
const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '主站首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/HomeIndex.vue")
            },
            {
                path:"/type",
                name:"typeBar",
                meta:{
                    title:'分类归档'
                },
                component: () => import("../views/TypeBar.vue")
            },
            {
                path:"/tag",
                name:"tagBar",
                meta:{
                    title:'标签归档'
                },
                component: () => import("../views/TagBar.vue")
            },
            {
                path:"/blogindex",
                name:"blogindex",
                meta:{
                    title:'选择博客'
                },
                component: () => import("../views/BlogIndex.vue")
            },
            {
                path:"/blog",
                name:"blog",
                meta:{
                    title:'当前博客'
                },
                component: () => import("../views/Blog.vue")
            },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;