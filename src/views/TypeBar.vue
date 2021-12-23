<template>
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
            <h1 class="tip_title"><i class="el-icon-folder-opened">分类</i></h1>
        </div>
       <div class="source">
           <el-input
                   placeholder="输入关键字进行过滤"
                   v-model="filterText">
           </el-input>

           <el-tree class="type-tree"
                   :data="data"
                   :props="defaultProps"
                   :filter-node-method="filterNode"
                   @node-click="handleNodeClick"
                   ref="tree">
           </el-tree>
       </div>
        <div class="plugins-tips">
            当前有{{typeCount}}条分类数据
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    setup(){
        const typeCount=ref();
        const data=ref([]);
        const getType = () =>{
            axios({
                url:"/leyuna/tagType/treeType",
                method : 'GET'
            }).then((res) => {
                data.value=res.data.data;
                typeCount.value=data.size;
            })
        }
        getType();
        return {
            getType,
            data,
            typeCount,
        };
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data) {
            if(data.children==null){
                console.log(data)
                this.$router.push({path:'/blogindex',query:{typeId:data.id,typeName:data.label}});
            }
        }
    },
    data() {
        return {
            filterText: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    }
};
</script>

<style scoped>
    .type-tree{
        padding: 7px;
        margin-top: 10px;
    }

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
</style>
