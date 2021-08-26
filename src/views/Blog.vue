<template>
    <div>
       <div class="blog-nav">
           <div @click="nav">点我</div>
           <div
                   v-for="anchor in titles"
                   :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                   @click="handleAnchorClick(anchor)"
           >
               <a style="cursor: pointer">{{ anchor.title }}</a>
           </div>
       </div>
        <div class="main">
           <div>
               <div class="blog-content">
                   <header class="blog-header">
                       <h1 class="blog-title">{{blogTitle}}</h1>
                       <div class="blog-info">
                           <span class="el-icon-timer">{{createTime}}</span><span>-</span>  <span class="el-icon-edit">{{updateTime}}</span>
                       </div>
                   </header>
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
            blogTitle:"",
            remarks:"",
            titles: [],
            blogContent:"",
            createTime:"",
            updateTime:"",
            type:"",
            tag:"",
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
                let blog=res.data.objData;
                this.blogTitle=blog.title;
                this.blogContent=blog.blogContent;
                this.remarks=blog.remarks;
                this.createTime=blog.createTime;
                this.updateTime=blog.updateTime;
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
    body{
        background-color: #fff;
    }
    .main{
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding-left: 50px;
        margin-right: 10px;
        width: 79.6%;
        float:right;
    }
    .blog-nav{
        position: fixed;
        overflow-y: auto;
        top: 0;
        bottom: 0;
        left: 0;
        width: 20rem;
        background-color: #fff;
        background-image: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn@master/img/bg/alpha-stars-timing-1.webp);
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
    .blog-content{
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        transition-property: all;
        transition-duration: .3s;
        transition-delay: 0s;
        color: #333;
        background-color: #fff;
        margin: 0;
        padding-top: 2.5rem;
    }
    .blog-title{
        margin: 0;
        padding: 10px;
        font-size: 1.5rem;
        font-weight: 900;
        font-family: 'Songti SC','Noto Serif SC',STZhongsong,STKaiti,KaiTi,Roboto,serif;
        line-height: 2;
    }
    .blog-header{
        position: relative;
        text-align: center;
    }
    .blog-info{
        font-size: 14px;
    }
    .blog-info span{
        padding-left: 23px;
    }
</style>
