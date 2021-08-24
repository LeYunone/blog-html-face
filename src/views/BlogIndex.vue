<template>
    <div class="maxBox">
        <div class="crumbs">
            <el-page-header @click='prev' v-if="tagName!=undefined" @back="goBack" :content="tagName">
            </el-page-header>
            <el-page-header @click='prev' v-else @back="goBack" :content="typeName">
            </el-page-header>
        </div>
        <div class="container2">
            <div class="plugins-tips">
                共 {{blogCount}} 篇
            </div>
            <el-timeline v-for="(item,index) in articleList">
                <el-timeline-item color="hsv" size="large" type="primary" :timestamp="item.createTime" :key="index" placement="top">
                    <el-card>
                        <a @click="toBlog(item.id)"><h1 class="blog_title">{{item.title}}</h1></a>
                        <p class="blog_tips">乐云一 修改于 {{item.updateTime}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
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
            temp:"2018-1-1",
            articleList:[],
            index:1,
            size:20,
            blogCount:"",
            tagName:"",
            typeName:"",
        };
    },
    mounted:function(){
        this.thisTypeBlog();//需要触发的函数
    },

    methods: {
        prev(){
            this.$router.go(-1)
        },
        thisTypeBlog(){
            const typeId = this.$route.query.typeId;
            const tagName=this.$route.query.tagName;
            const typeName=this.$route.query.typeName;
            this.tagName=tagName;
            this.typeName=typeName;
            axios({
                url:"/leyuna/blog/blogToType",
                method:"GET",
                params:{
                    "index":this.index,
                    "size":this.size,
                    "typeId":typeId,
                    "tagName":tagName,
                }
            }).then((res) =>{
                this.articleList=res.data.page.records;
                this.blogCount=res.data.objData;
            })
        },
        toBlog(id){
            const { href }=this.$router.resolve({path:'/blog',query:{blogId:id}});
            window.open(href, '_blank');
        }
    }
    ,
    setup(){
    },
};
</script>

<style scoped>
    .blog_title{
        color: #0078e7;
        text-decoration: none;
        transition: color .1s;
        font-family: 'Songti SC','Noto Serif SC',STZhongsong,STKaiti,KaiTi,Roboto,serif;
        font-size: 23px;
    }
    .blog_tips{
        margin-top: 15px;
    }
    .blog_title:hover{
        color:crimson;
    }
    .crumbs{
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        background-color:white;
    }
</style>
