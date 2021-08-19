<template>
    <el-row class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="hover" style="height:403px;">
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
import Schart from "vue-schart";
import { reactive } from "vue";
export default {
    name: "home",
    components: { Schart },
    setup() {
        const getList = () =>{
            axios({
                url:"/leyuna/blogs",
                method:"get",
                params:{
                    index:pageData.index,
                    size:pageData.size
                }
            }).then(()=>{
                s
            })
        }
        getList();
        let pageData=reactive({
            index: 1,
            size:10
        });
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
</style>
