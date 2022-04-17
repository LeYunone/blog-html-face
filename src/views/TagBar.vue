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
                <P class="tip_title">
                    <i class="el-icon-collection-tag">标签</i>
                </P>
            </div>
            <div class="source">
                <span v-for="(item,index) in tags">
                    <a  class="mytag" v-if="item.useCount>20" :href="'#/blogindex?tagName='+item.tagName" style="font-size: 31.55px;color: #dd6161">{{item.tagName}}</a>
                    <a  class="mytag" v-else-if="item.useCount>15" :href="'#/blogindex?tagName='+item.tagName" style="font-size: 27.55px;color: #f3dddd">{{item.tagName}}</a>
                    <a  class="mytag" v-else-if="item.useCount>10" :href="'#/blogindex?tagName='+item.tagName" style="font-size: 23.55px;color: #66c3ef">{{item.tagName}}</a>
                    <a  class="mytag" v-else-if="item.useCount>5" :href="'#/blogindex?tagName='+item.tagName" style="font-size: 20.55px;color: #f57f00">{{item.tagName}}</a>
                    <a  class="mytag" v-else-if="item.useCount>3" :href="'#/blogindex?tagName='+item.tagName" style="font-size: 18.27px;color: #6196cc">{{item.tagName}}</a>
                    <a  class="mytag" :href="'#/blogindex?tagName='+item.tagName" v-else  style="font-size: 15px;color: #999">{{item.tagName}}</a>
                </span>
            </div>
            <div class="plugins-tips">
                当前有{{tagCount}}条标签数据
            </div>
        </div>
    </div>
</template>

<script>
    import {ref, reactive} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import axios from "axios";

    export default {
        setup() {
            return {};
        },
        mounted: function () {
            this.getTas();//需要触发的函数
        },
        methods: {
            toBlogindex(tagName) {
                this.$router.push({path: '/blogindex', query: {tagName: tagName}});
            },
            getTas() {
                axios({
                    url: "/leyuna/tagType/tags",
                    method: "GET",
                    params:{
                        size:50
                    }
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.tags = data.data.records;
                        this.tagCount = data.data.total;
                    } else {
                        ElMessage.error(data.message);
                    }

                })
            }
        },
        data() {
            return {
                tags: [],
                tagCount: "",
            };
        }
    };
</script>

<style scoped>
    @import "../static/css/TagBar.css";
</style>
