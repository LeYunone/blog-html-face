<template>
    <el-row v-infinite-scroll="load" class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="hover" class="indexContent" style="height:403px;">
                        <a target="_blank" :href="'#/blog?blogId='+item.id" class="a_title">
                            <div class="article_title">{{item.title}}</div>
                        </a>
                        <div class="clearfix">
                            <span></span>
                        </div>
                        <el-divider content-position="center"><i class="el-icon-date"></i>{{item.createDt}}
                        </el-divider>
                        <div class="blog-content">
                            <div class="blog-content-into" v-html="item.remarks"></div>
                            <!--      <v-md-preview-html height="50px" :html="item.blogContent" preview-class="vuepress-markdown-body"></v-md-preview-html>-->
                        </div>
                        <div v-if="item.tag!=null">
                            <el-divider content-position="left">乐云一
                                <el-link :href="'#/blogindex?tagName='+str" class="home-tag"
                                         v-for="(str,index) in item.tag.split(',')">{{str}}
                                </el-link>
                            </el-divider>
                        </div>
                        <div v-else>
                            <el-divider content-position="left">乐云一</el-divider>
                        </div>
                    </el-card>
                    <div class="openBtn" @click="open('blog'+item.id)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-transfer"></use>
                        </svg>
                    </div>
                    <div class="md-editor" :id="'blog'+item.id" name="draw" style="display: none">
                        <v-md-editor v-model="item.blogContent" mode="preview"></v-md-editor>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-card class="box-right-card">
            <p style="color: #4eaaff">"不一定非要走到最后，某一段路上，对方给你带来了笑声，就已足够" ----</p>
            <div class="right-top">
                <div >
                    <el-link class="a-font" v-for="item in leetCodeLog" :href="'https://leyuna.xyz/#/blog?blogId='+item.id"
                             target="_blank">{{item.title}}
                    </el-link>
                </div>
            </div>
            <div>
                <el-divider></el-divider>
            </div>
            <div class="right-bott">
                <Disk></Disk>
            </div>
        </el-card>
    </el-row>
    <el-dialog :before-close="close_login" title="登陆" v-model="login_user" width="30%">
        <el-form label-width="70px">
            <el-form-item label="用户名">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.passWord"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="diskDrawer = false">取 消</el-button>
                            <el-button type="primary" @click="login">确 定</el-button>
                        </span>
        </template>
    </el-dialog>
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
    import Disk from "../views/Disk.vue";

    export default {
        components: {
            Disk
        },
        data() {
            return {
                leetCodeLog: [],
                percentage: "",
                show: "",
                uploadUrl: "",
                default_fileList: "0",
                form: {
                    userName: "",
                    passWord: ""
                },
                upLoadParam: {
                    saveTime: "",
                },
                user_disk: false,
                login_user: false,
                diskDrawer: false,
                pageData: {
                    index: 1,
                    size: 10
                },
                articleList: [],
                fileList: [],
                myFile: [],
                fileTotalSize: 0,
                upLoadValiValue: -1,
                orderType: 3,
                query: {
                    pageSize: 10,
                    pageTotal: 0,
                    pageIndex: 1,
                },
            }
        },
        mounted: function () {
            this.getList();
            this.randowmLeetCodeLog();
        },
        methods: {
            //博客相关
            randowmLeetCodeLog() {
                axios({
                    url: "/leyuna/blog/getLeetCode",
                    method: "GET"
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.leetCodeLog = data.data;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            },
            toBlogindex(tagName) {
                this.$router.push({path: '', query: {tagName: tagName}});
            },
            open(id) {
                let doc = document.getElementById(id);
                if (doc.getAttribute("style").match("none")) {
                    doc.setAttribute("style", "display:block")
                } else {
                    doc.setAttribute("style", "display:none")
                }
            },
            load() {
                if (this.pageData.size != 10) {
                    this.getList();
                }
                this.pageData.size += 3;
            },
            getList() {
                axios({
                    url: "/leyuna/blog/blogs",
                    method: "GET",
                    params: {
                        index: this.pageData.index,
                        size: this.pageData.size
                    }
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.articleList = data.data.records;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            },
            login() {
                axios({
                    url: "/leyuna/user/login",
                    method: "POST",
                    data: {
                        "userName": this.form.userName,
                        "passWord": this.form.passWord
                    }
                }).then((res => {
                    var data = res.data;
                    if (data.status) {
                        this.openDisk();
                    } else {
                        ElMessage.error(data.message);
                        this.form.userName = "";
                        this.form.passWord = "";
                    }
                }))
            },
            close_login() {
                this.diskDrawer = false;
                this.login_user = false;
            },
            handlePageChange(val) {
                this.query.pageIndex = val;
                this.fileTable();
            },
        },
        name: "home",
    };
</script>

<style scoped>
    @import "../static/css/HomeIndex.css";
</style>
