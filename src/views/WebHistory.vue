<template>
    <div class="maxBox" v-infinite-scroll="load">
        <div class="crumbs">
            <el-page-header  @back="prev">
            </el-page-header>
        </div>
        <div class="container2">
            <el-timeline v-for="(item,index) in articleList">
                <el-timeline-item color="hsv" size="large" type="primary" :timestamp="item.createTime" :key="index" placement="top">
                    <el-collapse >
                        <el-collapse-item :title="item.title">
                            <div>
                                <v-md-editor v-model="item.content" mode="preview"></v-md-editor>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
<!--                    <el-card>-->
<!--                        <a @click="toBlog(item.id)"><h1 class="blog_title">{{item.title}}</h1></a>-->
<!--                        <p class="blog_tips">乐云一 修改于 {{item.updateTime}}</p>-->
<!--                    </el-card>-->
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
            articleList:[],
            index:1,
            size:20,
            content:"",
        };
    },
    mounted:function(){
        this.thisHistory();
    },

    methods: {
        load(){
            if(this.size!=20){
                this.thisHistory();
            }
            this.size+=3;
        },
        prev(){
            this.$router.go(-1)
        },
        thisHistory(){
            axios({
                url:"/leyuna/blog/blogs",
                method:"GET",
                params:{
                    index:this.index,
                    size:this.size,
                    blogType:2
                }
            }).then((res) =>{
                var data = res.data;
                if(data.status){
                    this.articleList=data.data.records;
                }else{
                    ElMessage.error(data.message)
                }
            })
        },
    }
};
</script>

<style scoped>
    @import "../static/css/WebHistory.css";
</style>
