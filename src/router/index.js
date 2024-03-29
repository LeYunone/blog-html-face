import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: '主站首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/HomeIndex.vue")
            },
            {
                path:"/type",
                name:"type",
                meta:{
                    title:'分类归档'
                },
                component: () => import("../views/TypeBar.vue")
            },
            {
                path:"/tag",
                name:"tag",
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
                path:"/webhistory",
                name:"webhistory",
                meta:{
                    title:'网站短史'
                },
                component: () => import("../views/WebHistory.vue")
            }, {
                path:"/allblogindex",
                name:"allblogindex",
                meta:{
                    title:'所有博客'
                },
                component: () => import("../views/AllBlogIndex.vue")
            },{
                path: "/animeBar",
                name: "animeBar",
                meta: {
                    title: 'ANIME'
                },
                component:() => import("../views/AnimeBar.vue")
            }
        ]
    } ,{
        path:"/blog",
        name:"blog",
        meta:{
            title:'当前博客'
        },
        component: () => import("../views/Blog.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;