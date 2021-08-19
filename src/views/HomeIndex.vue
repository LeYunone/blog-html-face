<template>
    <el-row class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="hover" class="indexContent" style="height:403px;">
                        <template #header>
                            <div class="article_title" >标题</div>
                            <div class="clearfix">
                                <span></span>
                            </div>
                        </template>
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
    }
</style>
