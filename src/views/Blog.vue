<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 博客
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container2">
            <div class="plugins-tips">
                {{remarks}}
            </div>
            <div class="blogCss">
                <v-md-preview-html :html="blogContent" preview-class="vuepress-markdown-body"></v-md-preview-html>
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
            blogContent:"",
            remarks:"",
        };
    },
    mounted:function(){
        this.thisBlog();//需要触发的函数
    },
    methods: {
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
    }
    ,
    setup(){
    },
};
</script>

<style scoped>
    .blogCss{
        color:red;
    }
</style>
