<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 归档
                </el-breadcrumb-item>
                <el-breadcrumb-item>分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container2">
            <div class="plugins-tips">
                <h1 class="tip_title"><i class="el-icon-collection-tag">标签</i></h1>
            </div>
            <div class="source">
                <div>
                    <el-tag @click="toBlogindex(item.tagName)" v-for="(item,index) in tags">{{item.tagName}}</el-tag>
                </div>
            </div>
            <div class="plugins-tips">
                当前有{{tagCount}}条分类数据
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, reactive } from "vue";
    import { ElMessage, ElMessageBox } from "element-plus";
    import axios from "axios";
    export default {
        setup(){
            return {
            };
        },
        mounted:function(){
            this.getTas();//需要触发的函数
        },
        methods: {
            toBlogindex(tagName){
                this.$router.push({path:'/blogindex',query:{tagName:tagName}});
            },
            getTas(){
                axios({
                    url:"/leyuna/tagType/tags",
                    method:"GET",
                }).then((res) => {
                    this.tags=res.data.listData;
                    this.tagCount=res.data.objData;
                })
            }
        },
        data() {
            return {
                tags:[],
                tagCount:"",
            };
        }
    };
</script>

<style scoped>
    .content-title {
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .tip_title{
        margin-right:20px;
        font-size: 1.5rem;
        font-weight: 900;
        font-family: 'Songti SC','Noto Serif SC',STZhongsong,STKaiti,KaiTi,Roboto,serif;
    }
    .source{
        margin-top: 20px;
        padding: 24px;
    }
</style>
