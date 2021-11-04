<template>
    <div class="about">
        <v-header/>
        <v-sidebar/>
        <div class="content-box">
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive>
                            <component :is="Component"/>
                        </keep-alive>
                    </transition>
                    <!-- <el-backtop target=".content"></el-backtop> -->
                    <div style="width:300px;margin:0 auto; padding:20px 0">
                        <a target="_blank"
                           href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43018102000371"
                           style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                            <img :src=beian style="float:left;"/>
                            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
                                湘公网安备
                                43018102000371号</p></a>
                    </div>
                    <div style="width:300px;margin:0 auto;text-align: center">
                        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
                            湘ICP备2021014426号</p>
                    </div>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import beian from '../assets/img/beian.png'
    import {computed} from "vue";
    import {useStore} from "vuex";
    import vHeader from "../components/Header.vue";
    import vSidebar from "../components/Sidebar.vue";
    import "../assets/css/main.css";
    import "../assets/css/color-dark.css";

    export default {
        data() {
            return {
                beian: beian
            }
        },
        components: {
            vHeader,
            vSidebar,
        },
        setup() {
        },
    };
</script>