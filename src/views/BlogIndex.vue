<template>
    <div class="maxBox" v-infinite-scroll="load">
        <div class="crumbs">
            <el-page-header v-if="tagName!=undefined" @back="prev" :content="tagName">
            </el-page-header>
            <el-page-header v-else @back="prev" :content="typeName">
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
        this.thisTypeBlog();
    },

    methods: {
        load(){
            if(this.size!=20){
                this.thisTypeBlog();
            }
            this.size+=3;
        },
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
                url:"/leyuna/blog/blogs",
                method:"GET",
                params:{
                    index:this.index,
                    size:this.size,
                    type:typeId,
                    tag:tagName,
                    blogType:1
                }
            }).then((res) =>{
                var data = res.data;
                if(data.status){
                    this.articleList=data.data.records;
                    this.blogCount=data.data.total;  
                }else{
                    ElMessage.error(data.message);
                }
            })
        },
        toBlog(id){
            const { href }=this.$router.resolve({path:'/blog',query:{blogId:id}});
            window.open(href, '_blank');
        }
    }
};
</script>

<style scoped>
    @import "../static/css/BlogIndex.css";
</style>
