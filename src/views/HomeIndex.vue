<template>
    <el-row class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="hover" class="indexContent" style="height:403px;">
                        <a href="#"><div class="article_title" >{{item.title}}</div></a>
                        <div class="clearfix">
                            <span></span>
                        </div>
                        <el-divider content-position="center"><i class="el-icon-date"></i>{{item.createTime}}</el-divider>
                        <div>
                            <v-md-preview-html height="50px" :html="item.blogContent" preview-class="vuepress-markdown-body"></v-md-preview-html>
                        </div>
                        <el-divider content-position="left">少年包青天</el-divider>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
export default {
    data(){
      return{
      }
    },
    name: "home",
    setup() {
        let pageData=reactive({
            index: 1,
            size:10
        });
        const articleList = ref([]);
        const getList = () =>{
            axios({
                url:"/leyuna/blog/blogs",
                method:"get",
                params:{
                    index:pageData.index,
                    size:pageData.size
                }
            }).then((res)=>{
                articleList.value=res.data.page.records;
            })
        }
        getList();

        return {
            articleList,
            pageData
        };
    },
};
</script>

<style scoped>
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }
    .indexContent{
        opacity: 0.97;
    }
    .article_title{
        text-align: center;
        color:blue;
        margin: 0;
        padding: 10px;
        font-size: 1.5rem;
        font-weight: 900;
        font-family: 'Hiragino Sans GB';
    }
</style>
