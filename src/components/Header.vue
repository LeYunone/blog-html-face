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
            :size="searchSize"
            v-model="search"
            direction="ttb"
            >
        <div class="search-from">
            <el-input @input="searchKey(title)" @keyup.enter.native="searchKey(title)"  v-model="title"  type="search" placeholder="搜索..." />
        </div>
        <div class="search-content">
            <ol class="search-ol">
                <li class="search-li" v-for="(item,index) in dataList">
                    <a target="_blank" :href="'#/blog?blogId='+item.id" class="search-a"> <span v-html=item.title></span></a>
                </li>
            </ol>
        </div>

        <div class="block">
            <el-pagination
                    layout="prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
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
                pageSize: 6,
            },
            dataList:[],
            pageTotal:"0",
            searchSize:"500px",
        };
    },
    methods: {
        handleClose(done) {
        },
        searchKey(title){
            this.query.pageIndex=1;
            this.query.pageSize=6;
            this.pageTotal=0;
            this.input(title);
        },
        input(title){
            if(title.length!=0){
                axios({
                    url:"/leyuna/blog/search",
                    params:{
                        key:title,
                        index:this.query.pageIndex,
                        size:this.query.pageSize
                    },
                }).then((res) => {
                    if(res.data.data.code=='200'){
                        this.dataList=res.data.data.objData.listData;
                        this.pageTotal=res.data.data.objData.totole;
                    }else{
                        ElMessage.error(res.data.data.srcData);
                    }
                })
            }
        },
        // 分页导航
        handlePageChange(val){
            this.query.pageIndex = val;
            this.input(this.title);
        }
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
    .search-a :hover{
        color:#DB2828;
        border-left: 1px dashed #cc0000;
        border-right: 1px dashed #cc0000;
    }
    .search-a{
        display: block;
        width: 100%;
        padding: .5rem;
        border-bottom: 1px dashed #ccc;
        font-family: 'Songti SC','Noto Serif SC',STZhongsong,STKaiti,KaiTi,Roboto,serif;
        font-weight: 700;
        font-size: 1.2rem;
        max-width: 800px;
        transition-property: all;
        transition-duration: .3s;
        transition-delay: 0s;
        color: #0078e7;
        text-decoration: none;
        transition: color .1s;
        text-align: center;
    }
    .search-ol{
        margin: 0;
        list-style-type: none;
        padding-inline-start: 0;
    }
    .search-li{
        display: flex;
        justify-content: center;
    }
    ::v-deep .el-input__inner{
        height: 65px;
        background: 0 0;
        color: #333;
        font-size: 1.5rem;
        margin-left: 560px;
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
