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
                        <el-divider content-position="left">乐云一</el-divider>
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
            }
        },
        methods: {
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
                pageData.size += 3;
                getList();
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
            getList();

            return {
                articleList,
                pageData,
                load
            };
        },
    };
</script>

<style scoped>
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
        opacity: 0.97;
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
