<template>
    <el-row v-infinite-scroll="load" class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="hover" class="indexContent" style="height:403px;">
                        <a @click="toBlog(item.id)" class="a_title">
                            <div class="article_title">{{item.title}}</div>
                        </a>
                        <div class="clearfix">
                            <span></span>
                        </div>
                        <el-divider content-position="center"><i class="el-icon-date"></i>{{item.createTime}}
                        </el-divider>
                        <div class="blog-content">
                            <div class="blog-content-into" v-html="item.remarks"></div>
                            <!--      <v-md-preview-html height="50px" :html="item.blogContent" preview-class="vuepress-markdown-body"></v-md-preview-html>-->
                        </div>
                        <div v-if="item.tag!=null">
                            <el-divider content-position="left">乐云一 <el-link :href="'#/blogindex?tagName='+str" class="home-tag" v-for="(str,index) in item.tag.split(',')">{{str}}</el-link></el-divider>
                        </div>
                        <div v-else>
                            <el-divider content-position="left">乐云一 </el-divider>
                        </div>
                    </el-card>
                    <div class="openBtn" @click="open('blog'+item.id)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-transfer"></use>
                         </svg>
                    </div>
                    <div class="md-editor"  :id="'blog'+item.id" name="draw" style="display: none">
                        <v-md-editor v-model="item.blogContent" mode="preview"></v-md-editor>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-card class="box-right-card">
            <div class="right-top">
                <br/>
                <br/>
                如果你迷恋岁月舍不得向前<br/>
                我就默默记录这诗篇<br/>
                如果你厌倦引力想要去飞行<br/>
                我就让 全世界的风吹向你<br/>
            </div>
            <div>
                <el-divider></el-divider>
            </div>
            <div class="right-bott">
                <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                    待开发
                </el-button>
                <el-drawer
                        title="我是标题"
                        v-model="drawer"
                        :with-header="false">
                    <span>开发中...</span>
                </el-drawer>
            </div>
        </el-card>
    </el-row>
    <div class="onTop">
        <el-backtop target=".content" :bottom="100" :right="500">
            <div
                    style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >
                UP
            </div>
        </el-backtop>
    </div>
</template>
<script>
    import {ref, reactive} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import axios from "axios";

    export default {
        data() {
            return {
                drawer: false,
            }
        },
        methods: {
            toBlogindex(tagName){
                this.$router.push({path:'',query:{tagName:tagName}});
            },
            open(id) {
                let doc = document.getElementById(id);
                if(doc.getAttribute("style").match("none")){
                    doc.setAttribute("style","display:block")
                }else{
                    doc.setAttribute("style","display:none")
                }
            },
            toBlog(id) {
                const {href} = this.$router.resolve({path: '/blog', query: {blogId: id}});
                window.open(href, '_blank');
            }
        },
        name: "home",
        setup() {
            let pageData = reactive({
                index: 1,
                size: 10
            });
            const load = () => {
                getList();
                pageData.size += 3;
            }
            const articleList = ref([]);
            const getList = () => {
                axios({
                    url: "/leyuna/blog/blogs",
                    method: "get",
                    params: {
                        index: pageData.index,
                        size: pageData.size
                    }
                }).then((res) => {
                    articleList.value = res.data.page.records;
                })
            }

            return {
                articleList,
                pageData,
                load
            };
        },
    };
</script>

<style>
    .right-bott{
        height: 300px;
    }
    .home-tag{
        padding: 7px;
        color: #f6a939;
        border-radius: 4px;
    }
    .right-top{
        padding: .6rem 1rem;
        border-left: 4px solid #4eaaff;;
        background-color:rgba(0,120,231,.05);
        height: 300px;
        font-family: 'PingFang SC','Microsoft YaHei',Roboto,Arial,sans-serif;
    }
    .box-right-card{
        position: absolute;
        top:10px;
        right: 100px;
        height: 670px;
        width: 300px;
        float:right;
        opacity: 0.9;
    }
    .clearfix {
        clear:both;
    }
    .openBtn{
        position: relative;
        bottom: 20px;
        text-align: center;
        background-color: #fafafa;
    }
    .draw-enter-active, .draw-leave-active {
        transition: all 1s ease;
    }

    .draw-enter, .draw-leave-to {
        height: 0;
    }
    .md-editor{
        position: relative;
        bottom: 20px;
        opacity: 0.97;
        height: 100%;
    }
    .blog-content {
        padding: 8px 16px;
        background-color: #ecf8ff;
        border-radius: 4px;
        border-left: 5px solid #348fc3;
        margin: 20px 0;
    }

    .blog-content-into {
        padding: 7px;
    }

    .sharelistBox {
        transition: all 0.5s ease-out;
        font-size: 15px;
        padding-left: 90px;
    }

    .indexContent {
        opacity: 0.96;
    }

    .article_title {
        text-align: center;
        color: #409EFF;
        margin: 0;
        padding: 10px;
        font-size: 1.5rem;
        font-weight: 900;
        font-family: 'Hiragino Sans GB';
    }

    .article_title:hover {
        color: #E6A23C;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .box-card {
        width: 500px;
        height: 350px;
        background-color: white;
        display: block;
        right: 28px;
        top: 40px;
        bottom: 40px;
        position: relative;
        overflow: hidden;
        float: right;
    }
</style>
