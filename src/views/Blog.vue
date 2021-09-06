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
            <div id="nav-card" style="display: none">
                <p style="text-align: center;padding: 20px;color: #00a7e0" >导航</p>
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
                    <!--                   <v-md-editor v-model="blogContent" mode="preview"></v-md-editor>-->
                    <v-md-preview-html :html="html" preview-class="vuepress-markdown-body"></v-md-preview-html>
                </div>
                <div  class="bottom-tip">
                    <p>版权声明：本站原创文章，于{{createTime}}，乐云一发表</p>
                    <p style="margin-top: 4px;">转载请注明:leyuna.xyz</p>
                </div>
                <div class="comment">
                    <div style="text-align: center;font-size: 50px">待开发</div>
                </div>
            </div>
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

    export default {
        data() {
            return {
                activeName: "roleName",
                circleUrl: headUrl,
                qqUrl:qqUrl,
                wxUrl:wxUrl,
                openQQ:false,
                openWX:false,
                blogTitle: "",
                remarks: "",
                titles: [],
                blogContent: "",
                createTime: "",
                updateTime: "",
                html: "",
                type: "",
                tag: "",
                ifNav: true,
            };
        },
        mounted: function () {
            this.thisBlog();//需要触发的函数
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
                    let blog = res.data.objData;
                    this.blogTitle = blog.title;
                    this.blogContent = blog.blogContent;
                    this.html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(this.blogContent));
                    this.remarks = blog.remarks;
                    this.createTime = blog.createTime;
                    this.updateTime = blog.updateTime;
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
                    console.log(document.querySelector('.main').scrollTop+"==="+top)
                }, 20)
            };
            return {
                handleAnchorClick,
            }
        },
    };
</script>

<style scoped>
    .bottom-tip{
        background: #f3f3f3;
        border: #e9e9e9 1px solid;
        margin-bottom: 20px;
        color: #a0a0a0;
        padding: 25px 20px;
    }
    #nav-card {
        text-align: left;
        padding: 20px;
        font-size: 19px;
        font-family: SimHei;
    }

    #nav-card div:hover {
        background-color: rgba(232, 222, 222, 0.67);
    }
    .v-md-editor-preview{
        position: relative;
    }
    .bar-top {
        width: 100%;
    }

    .switch-bar {
        position: absolute;
        right: 7px;
        top: 150px;
    }

    .blogCss {
        color: red;
    }

    body {
        background-color: #fff;
        overflow: scroll;
    }

    .main {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding-left: 50px;
        margin-right: 130px;
        width: 73%;
        float: right;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100%;
    }

    .blog-nav {
        position: fixed;
        overflow-y: auto;
        top: 0;
        bottom: 0;
        left: 0;
        width: 20rem;
        background-color: #fff;
        background-image: url("../assets/img/blog-bar.jpg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom 1rem center;
        text-align: center;
        z-index: 10;
        transition-property: all;
        transition-duration: .3s;
        transition-delay: 0s;
        box-shadow: 0 0 2px;
    }
    .blog-content {
        display: flex;
        flex-direction: column;
        color: #333;
        background-color: #fff;
        margin: 0;
        padding-top: 2.5rem;
        margin: 0 1rem 1rem 1rem;
        background-color: #fff;
        padding: 1rem .5rem;
    }

    .blog-title {
        margin: 0;
        padding: 10px;
        font-size: 1.5rem;
        font-weight: 900;
        font-family: 'Songti SC', 'Noto Serif SC', STZhongsong, STKaiti, KaiTi, Roboto, serif;
        line-height: 2;
    }

    .blog-header {
        text-align: center;
    }

    .blog-info {
        font-size: 14px;
    }

    .blog-info span {
        padding-left: 23px;
    }
    .comment{
        height: 1000px;
    }
</style>
