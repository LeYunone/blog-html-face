<template>
    <div class="sidebar">
        <div class="bar-head" v-show="!collapse" style="display: block" id="headImg">
            <el-avatar :size="160" src="https://www.leyuna.xyz/image/avatar/admin.jpg"></el-avatar>
            <div class="bar-top">
                <el-link class="myName">乐云一</el-link>
                <el-divider>一个有趣的人</el-divider>
                <div class="myLink">
                    <a target="_blank"  class="aLink" href="http://wpa.qq.com/msgrd?v=3&uin=365627310&site=qq&menu=yes">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-QQ"></use>
                        </svg>
                    </a>
                    <el-popover
                            placement="right"
                            trigger="hover"
                            :width="300">
                        <template #reference>
                            <a class="aLink">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#el-icon-weixin"></use>
                                </svg>
                            </a>
                        </template>
                        <template #default>
                            <el-image style="width: 294px; height: 288px" :src="wxUrl" :fit="contain" />
                        </template>
                    </el-popover>

                    <a class="aLink" target="_blank" href="http://github.com/LeYunone">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-github"></use>
                        </svg>
                    </a>
                    <a class="aLink" href="mailto:365627310@qq.com">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-mail"></use>
                        </svg>
                    </a>
                    <a class="aLink" target="_blank" href="https://www.zhihu.com/people/leyuna">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-29"></use>
                        </svg>
                    </a>
                    <a class="aLink" target="_blank" href="https://space.bilibili.com/7749032">
                        <svg class="icon" target="_blank" aria-hidden="true">
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
                                    {{ threeItem.title }}
                                </el-menu-item>
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
    import {computed, watch} from "vue";
    import {useStore} from "vuex";
    import {useRoute} from "vue-router";
    import headUrl from '../assets/img/head.jpg';
    import wxUrl from '../assets/img/wx.png';

    export default {
        data() {
            return {
                wxUrl: wxUrl,
                circleUrl: headUrl,
                openQQ: false,
                openWX: false,
            }
        },
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
                }, {
                    icon: "el-icon-ship",
                    index: "/allblogindex",
                    title: "选个锤子老子全要"
                },
                {
                    icon: "el-icon-sugar",
                    index: "/animeBar",
                    title: "ANIME"
                }
                , {
                    icon: "el-icon-trophy",
                    index: "/webhistory",
                    title: "网站短史"
                }
                , {
                    title: "...待开发"
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
    };
</script>

<style>
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
