<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="header-right">
            <a @click="search=true" class="el-icon-search"></a>
        </div>
    </div>
    <el-drawer
            v-model="search"
            direction="ttb"
            >
        <div class="search-from">
            <el-input :input=input(title)  v-model="title" autocomplete="off" autocorrect="off" spellcheck="false" type="search" placeholder="搜索..." />
        </div>
        <div class="search-content">

        </div>

        <div class="block">
            <el-pagination
                    :hide-on-single-page="value"
                    layout="prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    >
            </el-pagination>
        </div>
    </el-drawer>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { ref, reactive } from "vue";
export default {
    data() {
        return {
            search: false,
            direction: 'rtl',
            title:"",
            query:{
                pageIndex: 1,
                pageSize: 10,
            },
            pageTotal:"0",
            value:false,
        };
    },
    methods: {
        handleClose(done) {
        },
        input(title){
            if(title.length==0){
                this.ifPage=false
            }
            axios({
                url:"/leyuna/blog/search",
                params:{
                    kry:title,
                    index:this.query.pageIndex,
                    size:this.query.pageSize
                },
            })
        },
    } ,
    setup() {
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        // 侧边栏折叠
        const collapseChage = () => {
            store.commit("handleCollapse", !collapse.value);
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                collapseChage();
            }
        });
        return {
            collapse,
            collapseChage,
        };
    },
};
</script>
<style scoped>
    ::v-deep .el-input__inner{
        height: 65px;
        background: 0 0;
        color: #333;
        font-size: 1.5rem;
        margin-left: 500px;
        border-radius: 3rem;
        padding: 1rem 1.5rem;
        border: 1px solid #999;
        box-sizing: border-box;
        width: 90%;
        max-width: 800px;
        font-family: 'Songti SC','Noto Serif SC',STZhongsong,STKaiti,KaiTi,Roboto,serif;
        font-weight: 900;
        text-align: center;
    }
    .block{
        text-align: center;
        margin-right: 150px;
        margin-top: 20px;
    }
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: rgba(0,120,231,.5);
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header-right{
    float: right;
    padding: 0 50px;
    cursor: pointer;
    line-height: 70px;
}
.header-right a{
    display: inline-flex;
    border: none;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
.web-title{
    text-align: center;
    line-height: 70px;
}
.header-right a:hover{
    background-color: #E5F1FD;
    color:#1d90e6;
}
</style>
