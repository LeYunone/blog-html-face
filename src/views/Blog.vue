<template>
    <div class="switch-bar">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#el-icon-menu"></use>
        </svg>
        <el-tabs v-model="activeName" @tab-click=tabClick tab-position="right" style="height: 190px;">
            <el-tab-pane name="roleName" label="角色卡"></el-tab-pane>
            <el-tab-pane name="navName" label="目录导航"></el-tab-pane>
            <el-tab-pane label="..."></el-tab-pane>
            <el-tab-pane label="待开发"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="blog-nav">
        <div>
            <div id="role-card" class="bar-head" style="display: block">
                <el-avatar :size="160" :src="circleUrl"></el-avatar>
                <div class="bar-top">
                    <el-link class="myName">乐云一</el-link>
                    <el-divider>一个有趣的人</el-divider>
                    <div class="myLink">
                        <a @click="openQQ=true" class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-QQ"></use>
                            </svg>
                        </a>
                        <a @click="openWX=true" class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-weixin"></use>
                            </svg>
                        </a>
                        <a class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-github"></use>
                            </svg>
                        </a>
                        <a class="aLink" target="_blank" href="http://github.com/LeYunone">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-github"></use>
                            </svg>
                        </a>
                        <a class="aLink"  target="_blank"  href="https://www.zhihu.com/people/leyuna">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-29"></use>
                            </svg>
                        </a>
                        <a class="aLink">
                            <svg class="icon" target="_blank" aria-hidden="true" href="https://space.bilibili.com/7749032">
                                <use xlink:href="#el-icon-bilibili-line"></use>
                            </svg>
                        </a>
                        <el-divider></el-divider>
                    </div>
                </div>
            </div>
            <div id="nav-card" style="display: none">
                <p style="text-align: center;padding: 20px;color: #00a7e0">导航</p>
                <div v-for="anchor in titles"
                     :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                     @click="handleAnchorClick(anchor)">
                    <a style="cursor: pointer">{{ anchor.title }}</a>
                </div>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="blog-content">
            <header class="blog-header">
                <p class="blog-title">{{blogTitle}}</p>
                <div class="blog-info">
                    <span class="el-icon-timer">{{createTime}}</span><span>-</span> <span class="el-icon-edit">{{updateTime}}</span>
                </div>
            </header>
            <div v-html="remarks" class="plugins-tips">
            </div>
            <div class="blogCss">
                <v-md-editor :model-value="blogContent" mode="preview"></v-md-editor>
            </div>
            <div class="bottom-tip">
                <p>版权声明：本站原创文章，于{{createTime}}，乐云一发表</p>
                <p style="margin-top: 4px;">转载请注明:leyuna.xyz</p>
            </div>
        </div>
        <v-comment/>
    </div>
    <el-dialog title="QQ" v-model="openQQ">
        <div style="text-align: center">
            <el-image
                    style="width: 338px; height: 593px;text-align: center"
                    :src="qqUrl"
                    fit="cover"></el-image>
        </div>
    </el-dialog>
    <el-dialog title="微信" v-model="openWX">
        <div style="text-align: center">
            <el-image
                    style="width: 456px; height: 487px"
                    :src="wxUrl"
                    fit="cover"></el-image>
        </div>
    </el-dialog>
</template>
<script>
    import {ref, reactive} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import VueMarkdownEditor, {xss} from '@kangc/v-md-editor';
    import axios from "axios";
    import headUrl from '../assets/img/head.jpg';
    import qqUrl from '../assets/img/qq.png';
    import wxUrl from '../assets/img/wx.png';
    import vComment from "../components/Comment.vue";

    export default {
        components: {
            vComment
        },
        data() {
            let self = this
            return {
                activeName: "roleName",
                circleUrl: headUrl,
                qqUrl: qqUrl,
                wxUrl: wxUrl,
                openQQ: false,
                openWX: false,
                blogTitle: "",
                remarks: "",
                titles: [],
                blogContent: "",
                createTime: "",
                updateTime: "",
                type: "",
                tag: "",
                ifNav: true,
            };
        },
        mounted: function () {
            this.thisBlog();//拿博客信息
        },
        methods: {
            tabClick(tab, event) {
                this.nav();
            },
            nav() {
                if (this.ifNav) {
                    const anchors = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
                    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

                    if (!titles.length) {
                        this.titles = [];
                        return;
                    }

                    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

                    this.titles = titles.map((el) => ({
                        title: el.innerText,
                        lineIndex: el.getAttribute('data-v-md-line'),
                        indent: hTags.indexOf(el.tagName),
                    }));
                    this.ifNav = false;
                }
                let navDisplay = document.getElementById("nav-card").getAttribute("style");
                if (navDisplay.match('none')) {
                    document.getElementById("nav-card").setAttribute("style", "display:block");
                    document.getElementById("role-card").setAttribute("style", "display:none");
                } else {
                    document.getElementById("nav-card").setAttribute("style", "display:none");
                    document.getElementById("role-card").setAttribute("style", "display:block");
                }
            },
            thisBlog() {
                const blogId = this.$route.query.blogId;
                axios({
                    url: "/leyuna/blog/blog/" + blogId,
                    method: "GET",
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        let blog = data.data;
                        this.blogTitle = blog.title;
                        this.blogContent = blog.blogContent;
                        this.remarks = blog.remarks;
                        this.createTime = blog.createDt;
                        this.updateTime = blog.updateDt;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            },
        },
        setup() {
            const handleAnchorClick = (anchor) => {
                const navItem = document.querySelector('.v-md-editor-preview');
                const {lineIndex} = anchor;
                const heading = document.querySelector(
                    `[data-v-md-line="${lineIndex}"]`);


                const top = heading.offsetTop;
                let timer = setInterval(() => {
                    if (document.querySelector('.main').scrollTop < top) {
                        document.querySelector('.main').scrollTop += 60;
                        if (document.querySelector('.main').scrollTop >= top - 60)
                            clearInterval(timer)
                    } else {
                        document.querySelector('.main').scrollTop -= 60
                        if (document.querySelector('.main').scrollTop <= top - 60)
                            clearInterval(timer)
                    }

                    console.log(document.querySelector('.main').scrollTop + "===" + top)
                }, 20)
            };
            return {
                handleAnchorClick,
            }
        },
    };
</script>

<style>
    @import "../static/css/Blog.css";
</style>
