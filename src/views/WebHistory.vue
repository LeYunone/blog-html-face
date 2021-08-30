<template>
    <div class="maxBox" v-infinite-scroll="load">
        <div class="crumbs">
            <el-page-header v-if="tagName!=undefined" @back="prev" :content="tagName">
            </el-page-header>
            <el-page-header v-else @back="prev" :content="typeName">
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
        this.thisHistory();//需要触发的函数
    },

    methods: {
        load(){
            this.size+=3;
            this.thisHistory();
        },
        prev(){
            this.$router.go(-1)
        },
        thisHistory(){
            axios({
                url:"/leyuna/blog/history",
                method:"GET",
                params:{
                    "index":this.index,
                    "size":this.size,
                }
            }).then((res) =>{
                this.articleList=res.data.page.records;
            })
        },
    }
    ,
    setup(){
    },
};
</script>

<style scoped>
    .crumbs{
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        background-color:white;
    }
</style>
