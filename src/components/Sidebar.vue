<template>
    <div class="sidebar">
        <div class="bar-head" style="display: block" id="headImg">
            <el-avatar :size="160" :src="circleUrl"></el-avatar>
            <div class="bar-top">
                <el-link class="myName">乐云一</el-link>
                <el-divider>一个有趣的人</el-divider>
                <div class="myLink">
                    <a class="aLink">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-QQ"></use>
                        </svg>
                    </a>
                    <a class="aLink">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-weixin"></use>
                        </svg>
                    </a>
                    <a class="aLink">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-github"></use>
                        </svg>
                    </a>
                    <a class="aLink">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-shejiaotubiao-06"></use>
                        </svg>
                    </a>
                    <a class="aLink">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-29"></use>
                        </svg>
                    </a>
                    <a class="aLink">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-bilibili-line"></use>
                        </svg>
                    </a>
                    <el-divider></el-divider>
                </div>
            </div>
        </div>
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#fff"
            text-color="#333" active-text-color="#DD2828" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/home",
                title: "主站首页",
            },
            {
                icon: "el-icon-s-flag",
                index: "2",
                title: "归档的选择",
                subs: [
                    {
                        index: "/tag",
                        title: "标签",
                    },
                    {
                        index: "/type",
                        title: "分类",
                    },
                ],
            },{
                icon: "el-icon-ship",
                index: "/allblogindex",
                title: "选个锤子老子全要"
            }
            ,{
                icon: "el-icon-trophy",
                index: "/webhistory",
                title: "网站短史"
            }
        ];

        const route = useRoute();
        const onRoutes = computed(() => {
            return route.path;
        });
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        return {
            items,
            onRoutes,
            collapse,
        };
    },
    data(){
        return {
            circleUrl:"src/assets/img/head.jpg"
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
