<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <div class="bar-head"><el-avatar :size="160" :src="circleUrl"></el-avatar></div>
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
                index: "/dashboard",
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
            },
            {
                icon: "el-icon-lx-copy",
                index: "/tabs",
                title: "tab选项卡",
            },
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
    overflow-y: scroll;
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
.bar-head{
    margin-top: 20px;
    text-align: center;
    border-radius: 4px 4px 0 0 ;
    text-align: center;
    position: relative;
}
</style>
