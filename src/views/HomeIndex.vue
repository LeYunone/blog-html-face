<template>
    <el-row v-infinite-scroll="load" class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="hover" class="indexContent" style="height:403px;">
                        <a @click="toBlog(item.id)" class="a_title"><div class="article_title" >{{item.title}}</div></a>
                        <div class="clearfix">
                            <span></span>
                        </div>
                        <el-divider content-position="center"><i class="el-icon-date"></i>{{item.createTime}}</el-divider>
                        <div  class="blog-content">
                            <div class="blog-content-into" v-html="item.remarks"></div>
<!--                            <v-md-preview-html height="50px" :html="item.blogContent" preview-class="vuepress-markdown-body"></v-md-preview-html>-->
                        </div>
                        <el-divider content-position="left">乐云一</el-divider>
                        <div @click="open">展开</div>
                    </el-card>
                    <div class="blog-real-content" v-if="show"  style="height: 100%;">
                        <v-md-editor v-model="item.blogContent" mode="preview"></v-md-editor>
                    </div>
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
          show:false,
      }
    },
    methods:{
        open(){
            this.show=true;
        },
        toBlog(id){
            const { href }=this.$router.resolve({path:'/blog',query:{blogId:id}});
            window.open(href, '_blank');
        }
    },
    name: "home",
    setup() {
        let pageData=reactive({
            index: 1,
            size:10
        });
        const load = ()=>{
            pageData.size+=3;
            getList();
        }
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
            pageData,
            load
        };
    },
};
</script>

<style scoped>
    .blog-content{
        padding: 8px 16px;
        background-color: #ecf8ff;
        border-radius: 4px;
        border-left: 5px solid #348fc3;
        margin: 20px 0;
    }
    .blog-content-into{
        padding: 7px;
    }
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
        padding-left: 90px;
    }
    .indexContent{
        opacity: 0.97;
    }
    .article_title{
        text-align: center;
        color:#409EFF;
        margin: 0;
        padding: 10px;
        font-size: 1.5rem;
        font-weight: 900;
        font-family: 'Hiragino Sans GB';
    }
    .article_title:hover{
        color:#E6A23C;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .box-card{
        width: 500px;
        height: 350px;
        background-color: white;
        display: block;
        right: 28px;
        top: 40px;
        bottom: 40px;
        position: relative;
        overflow: hidden;
        float:right;
    }
</style>
