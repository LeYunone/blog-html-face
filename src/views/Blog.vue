<template>
    <div>
        <div @click="nav">点我</div>
        <div
                v-for="anchor in titles"
                :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                @click="handleAnchorClick(anchor)"
        >
            <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 博客
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="el-main">
            <div class="plugins-tips">
                {{remarks}}
            </div>
            <div class="blogCss">
                <v-md-editor v-model="blogContent" mode="preview"></v-md-editor>
<!--    新版本用md原文本   <v-md-preview-html :html="blogContent" preview-class="vuepress-markdown-body"></v-md-preview-html>-->
            </div>
            <div class="plugins-tips">
                {{remarks}}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
export default {
    data() {
        return {
            title:"",
            remarks:"",
            titles: [],
            blogContent:"",
        };
    },
    mounted:function(){
        this.thisBlog();//需要触发的函数
    },
    methods: {
        nav(){
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
        },
        thisBlog(){
            const blogId = this.$route.query.blogId;
            axios({
                url:"/leyuna/blog/blog/"+blogId,
                method:"GET",
            }).then((res) =>{
                this.title=res.data.objData.title;
                this.blogContent=res.data.objData.blogContent;
                this.remarks=res.data.objData.remarks;
            })
        },
    },
    setup(){
        const handleAnchorClick=(anchor)=>{
            const navItem=document.querySelector('.v-md-editor-preview');
            const { lineIndex } = anchor;
            const heading = navItem.querySelector(
                `[data-v-md-line="${lineIndex}"]`);
            const top=heading.offsetTop
            let timer=setInterval(()=>{

                if(document.documentElement.scrollTop<top)
                {
                    document.documentElement.scrollTop += 60;
                    if(document.documentElement.scrollTop>=top-60)
                        clearInterval(timer)
                }
                else
                {
                    document.documentElement.scrollTop -= 60
                    if(document.documentElement.scrollTop<=top-60)
                        clearInterval(timer)
                }
                // console.log(document.documentElement.scrollTop);
            },20)
        };
        return {
            handleAnchorClick,
        }
    },
};
</script>

<style scoped>
    .blogCss{
        color:red;
    }
    .el-main{
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 10px;
    }
</style>
