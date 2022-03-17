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
                   :data="types"
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
    mounted: function () {
        this.getType();//需要触发的函数
    },
    methods: {
        getType(){
            axios({
                url:"/leyuna/tagType/treeType",
                method : 'GET'
            }).then((res) => {
                var data = res.data;
                if(data.status){
                    this.types=data.data;
                    this.typeCount=this.types.length;
                }

            })
        },
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
            },
            types:[],
            typeCount:0,
        };
    }
};
</script>

<style scoped>
    @import "../static/css/TypeBar.css";
</style>
