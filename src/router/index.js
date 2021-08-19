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
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;