<template>
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
            <div class="bottom-tip">
                <p>版权声明：本站原创文章，于{{createDt}}，乐云一发表</p>
                <p style="margin-top: 4px;">转载请注明:leyuna.xyz</p>
            </div>
        </div>
    </div>
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
            let self = this
            return {
            };
        },
        mounted: function () {
        },
        methods: {
        },
    };
</script>

<style>
    @import "../static/css/Blog.css";
</style>
