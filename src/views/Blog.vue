<template>
    <div>
       <div class="blog-nav">
           <div>
               <div id="role-card" class="bar-head" style="display: block">
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
              <div id="nav-card" style="display: none">
                  <div   v-for="anchor in titles"
                         :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                         @click="handleAnchorClick(anchor)">
                      <a style="cursor: pointer">{{ anchor.title }}</a>
                  </div>
              </div>
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
    <div  class="switch-bar">
        <el-tabs  tab-position="right" style="height: 150px;">
            <el-tab-pane  label="目录导航"></el-tab-pane>
            <el-tab-pane :tab-click=nav()  label="角色卡"></el-tab-pane>
<!--            <el-tab-pane label="..."></el-tab-pane>-->
<!--            <el-tab-pane label="待开发"></el-tab-pane>-->
        </el-tabs>
    </div>
</template>
<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
export default {
    data() {
        return {
            circleUrl:"src/assets/img/head.jpg",
            blogTitle:"",
            remarks:"",
            titles: [],
            blogContent:"",
            createTime:"",
            updateTime:"",
            type:"",
            tag:"",
            ifNav:true,
        };
    },
    mounted:function(){
        this.thisBlog();//需要触发的函数
    },
    methods: {
        role(){
            document.getElementById("nav-card").setAttribute("style","display:none");
            document.getElementById("role-card").setAttribute("style","display:block");
        },
        nav(){
            console.log("1" )
            if(this.ifNav){
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
                this.ifNav=false;
            }
            let navDisplay=document.getElementById("nav-card").getAttribute("style");
            if(navDisplay.match('none')){
                document.getElementById("nav-card").setAttribute("style","display:block");
                document.getElementById("role-card").setAttribute("style","display:none");
            }else{
                document.getElementById("nav-card").setAttribute("style","display:none");
                document.getElementById("role-card").setAttribute("style","display:block");
            }
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
    .bar-top{
        width: 100%;
    }
    .switch-bar{
        position: absolute;
        right:0px;
        top:150px;
    }
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
        margin-right: 130px;
        width: 73%;
        float:right;
        overflow: visible;
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
        margin: 0 1rem 1rem 1rem;
        background-color: #fff;
        padding: 1rem .5rem;
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
