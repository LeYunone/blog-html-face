<template>
    <div class="switch-bar">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#el-icon-menu"></use>
        </svg>
        <el-tabs v-model="activeName" @tab-click=tabClick tab-position="right" style="height: 190px;">
            <el-tab-pane name="roleName" label="角色卡"></el-tab-pane>
            <el-tab-pane name="navName" label="目录导航"></el-tab-pane>
            <el-tab-pane label="..."></el-tab-pane>
            <el-tab-pane label="待开发"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="blog-nav">
        <div>
            <div id="role-card" class="bar-head" style="display: block">
                <el-avatar :size="160" :src="circleUrl"></el-avatar>
                <div class="bar-top">
                    <el-link class="myName">乐云一</el-link>
                    <el-divider>一个有趣的人</el-divider>
                    <div class="myLink">
                        <a @click="openQQ=true" class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-QQ"></use>
                            </svg>
                        </a>
                        <a @click="openWX=true" class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-weixin"></use>
                            </svg>
                        </a>
                        <a class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-github"></use>
                            </svg>
                        </a>
                        <a class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-shejiaotubiao-06"></use>
                            </svg>
                        </a>
                        <a class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-29"></use>
                            </svg>
                        </a>
                        <a class="aLink">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#el-icon-bilibili-line"></use>
                            </svg>
                        </a>
                        <el-divider></el-divider>
                    </div>
                </div>
            </div>
            <div id="nav-card" style="display: none">
                <p style="text-align: center;padding: 20px;color: #00a7e0">导航</p>
                <div v-for="anchor in titles"
                     :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                     @click="handleAnchorClick(anchor)">
                    <a style="cursor: pointer">{{ anchor.title }}</a>
                </div>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="blog-content">
            <header class="blog-header">
                <p class="blog-title">{{blogTitle}}</p>
                <div class="blog-info">
                    <span class="el-icon-timer">{{createTime}}</span><span>-</span> <span class="el-icon-edit">{{updateTime}}</span>
                </div>
            </header>
            <div v-html="remarks" class="plugins-tips">
            </div>
            <div class="blogCss">
                <!--                   <v-md-editor v-model="blogContent" mode="preview"></v-md-editor>-->
                <v-md-preview-html :html="html" preview-class="vuepress-markdown-body"></v-md-preview-html>
            </div>
            <div class="bottom-tip">
                <p>版权声明：本站原创文章，于{{createTime}}，乐云一发表</p>
                <p style="margin-top: 4px;">转载请注明:leyuna.xyz</p>
            </div>
            <div class="do-comment">
                <div class="do-information">
                    <el-form inline="true" label-width="70px">
                        <el-form-item>
                            <p style="color:#DB2828;font-family:'PingFang SC','Microsoft YaHei',Roboto,Arial,sans-serif">
                                [头像:一天一次]</p>
                            <el-upload
                                    class="avatar-uploader"
                                    action="/leyuna/tourist/requestUpImg"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <el-avatar class="avatar" fit="contain" v-if="imageUrl" shape="square" :size="100"
                                           :src="imageUrl"></el-avatar>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="署名">
                            <el-input placeholder="请输入署名\" style="width: 300px" required="true"
                                      v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input placeholder="自由发挥:网站\邮箱\某些联系方式(选填...)" style="width: 300px"
                                      v-model="form.information"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="sumbitComment">提交</el-button>
                        </el-form-item>
                        <v-md-editor
                                left-toolbar="undo|redo|clear|bold italic strikethrough|ul ol|link code |emoji emoToolbar"
                                :toolbar="toolbar"
                                right-toolbar="sync-scroll preview"  v-model="commentText"
                                height="300px" disabled-menus="[]"></v-md-editor>
                        <div class="length-count">{{commentText.length}}/500[30s/]</div>
                    </el-form>
                </div>
            </div>
            <div style="padding: .375em; font-weight: bold; font-size: 1.25em;">{{query.pageTotal}}条评论</div>
            <div class="comment-all">
                <div class="comment" v-for="(item,index) in commentList">
                    <el-avatar class="comment-img" shape="square" :size="50" :src="item.commentHead"></el-avatar>
                    <div class="comment-card">
                        <div class="comment-head">
                            <span>{{item.name}}</span>
                            <span class="webKing" v-if="item.admin==='admin'">站主</span>
                            <span class="comment-time">{{item.createDt}}</span>
                        </div>
                        <div class="comment-info">{{item.information}}</div>
                        <div class="comment-content">
                            <div v-html="item.content"></div>
                        </div>
                        <span @click="closeReply(item.id)" class="cancel-reply" v-if="isReply===item.id"
                              style="color: crimson">取消回复</span>
                        <span @click="openReply(item.id)" v-else class="reply"><i class="el-icon-message"></i>回复</span>
                        <span>
                             <svg @click="goods(item)" class="this-icon" aria-hidden="true">
                                    <use xlink:href="#el-icon-heart"></use>
                             </svg>
                            : {{item.goods}}
                        </span>
                        <div v-if="isReply===item.id">
                            <el-form style="border-top: 2.4px solid #000000; padding: 7px" inline="true"
                                     label-width="70px">
                                <el-form-item label="署名">
                                    <el-input style="width: 300px" required="true" v-model="subForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式">
                                    <el-input style="width: 300px" v-model="subForm.information"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="success" @click="sumbitReplyComment(item.id,item.name)">提交
                                    </el-button>
                                </el-form-item>
                                <v-md-editor
                                        left-toolbar="undo|redo|clear|bold italic strikethrough|ul ol|link code |emoji replayEmoToolbar"
                                        right-toolbar="sync-scroll preview"  v-model="replyCommentText"
                                        :toolbar="toolbar"
                                        height="240px" disabled-menus="[]"></v-md-editor>
                                <div class="length-count">{{replyCommentText.length}}/500</div>
                            </el-form>
                        </div>
                        <div class="comment-replay" v-for="(subItem,subIndex) in item.subComment">
                            <el-avatar class="comment-img" shape="square" :size="50"
                                       :src="subItem.commentHead"></el-avatar>
                            <div class="comment-replay-card">
                                <div class="comment-head">
                                    <span>{{subItem.name}}</span>
                                    <span class="webKing" v-if="subItem.admin==='admin'">站主</span>
                                    <span style="color: #8590a6;padding: 10px">回复</span>
                                    <span>{{subItem.respondent}}</span>
                                    <span class="comment-time">{{subItem.createTime}}</span>
                                </div>
                                <div class="comment-info">{{subItem.information}}</div>
                                <div class="comment-content">
                                    <div v-html="subItem.content"></div>
                                </div>
                                <span @click="closeReply(subItem.id)" class="cancel-reply" v-if="isReply===subItem.id"
                                      style="color: crimson">取消回复
                                </span>
                                <span @click="openReply(subItem.id)" v-else class="reply"><i
                                        class="el-icon-message"></i>回复
                                </span>
                                <span>
                                     <svg @click="goods(subItem)" class="this-icon" aria-hidden="true">
                                            <use xlink:href="#el-icon-heart"></use>
                                     </svg>
                                        : {{subItem.goods}}
                                </span>
                                <div v-if="isReply===subItem.id">
                                    <el-form style="border-top: 2.4px solid #000000; padding: 7px" inline="true"
                                             label-width="70px">
                                        <el-form-item label="署名">
                                            <el-input style="width: 300px" required="true"
                                                      v-model="subForm.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系方式">
                                            <el-input style="width: 300px" v-model="subForm.information"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="success" @click="sumbitReplyComment(item.id,subItem.name)">
                                                提交
                                            </el-button>
                                        </el-form-item>
                                        <v-md-editor
                                                left-toolbar="undo|redo|clear|bold italic strikethrough|ul ol|link code |emoji replayEmoToolbar"
                                                right-toolbar="sync-scroll preview"
                                                v-model="replyCommentText"
                                                :toolbar="toolbar"
                                                height="240px" disabled-menus="[]"></v-md-editor>
                                        <div class="length-count">{{replyCommentText.length}}/500</div>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-card">
                    <el-pagination background layout="prev, pager, next" :current-page="query.pageIndex"
                                   :page-size="query.pageSize" :total="query.pageTotal"
                                   @current-change="handlePageChange"></el-pagination>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="QQ" v-model="openQQ">
        <div style="text-align: center">
            <el-image
                    style="width: 338px; height: 593px;text-align: center"
                    :src="qqUrl"
                    fit="cover"></el-image>
        </div>
    </el-dialog>
    <el-dialog title="微信" v-model="openWX">
        <div style="text-align: center">
            <el-image
                    style="width: 456px; height: 487px"
                    :src="wxUrl"
                    fit="cover"></el-image>
        </div>
    </el-dialog>
    <el-dialog
            title="emo"
            v-model="emoDia"
            width="36%"
            center>
        <el-image v-for="item in emoImg"
                  style="width: 60px; height: 60px;margin: 9px"
                  :src="item"
                  @click="markEmoImg(item)"
                  fit="contain"></el-image>
    </el-dialog>

    <el-dialog
            title="emo"
            v-model="emoReDia"
            width="36%"
            center>
        <el-image v-for="item in emoReImg"
                  style="width: 60px; height: 60px;margin: 9px"
                  :src="item"
                  @click="markReEmoImg(item)"
                  fit="contain"></el-image>
    </el-dialog>

</template>
<script>
    import {ref, reactive} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import VueMarkdownEditor, {xss} from '@kangc/v-md-editor';
    import axios from "axios";
    import headUrl from '../assets/img/head.jpg';
    import qqUrl from '../assets/img/qq.png';
    import wxUrl from '../assets/img/wx.png';

    export default {
        data() {
            let self = this
            return {
                emoDia: false,
                emoImg: [],

                emoReDia: false,
                emoReImg: [],
                toolbar: {
                    emoToolbar: {
                        icon: 'el-icon-chat-line-round',
                        title: '表情包',
                        action() {
                            self.getEmoList();
                        },
                    },
                    replayEmoToolbar: {
                        icon: 'el-icon-chat-line-round',
                        title: '表情包',
                        action() {
                            self.getReEmoList();
                        },
                    },
                },
                isReply: "",
                imageUrl: "",
                subForm: {
                    name: "",
                    information: ""
                },
                form: {
                    name: "",
                    information: ""
                },
                replyCommentText: "",
                commentText: "",
                query: {
                    pageSize: 10,
                    pageTotal: 0,
                    pageIndex: 1,
                },
                activeName: "roleName",
                circleUrl: headUrl,
                qqUrl: qqUrl,
                wxUrl: wxUrl,
                openQQ: false,
                openWX: false,
                blogTitle: "",
                remarks: "",
                titles: [],
                blogContent: "",
                createTime: "",
                updateTime: "",
                html: "",
                type: "",
                tag: "",
                ifNav: true,
                commentList: [],
                commentType: 2,
                file: File,
                valiValue: true
            };
        },
        mounted: function () {
            this.thisBlog();//拿博客信息
            this.comment(); //拿评论
        },
        methods: {
            //添加表情包到mark中
            markEmoImg(emo) {
                this.commentText = this.commentText + "![emo](" + emo + "){{{width=\"auto\" height=\"auto\"}}}";
                this.emoDia = false;
            },
            //获得服务器表情包
            getEmoList() {
                axios({
                    url: "/leyuna/blog/getEmoticon",
                    method: "GET"
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.emoImg = data.data;
                    } else {
                        ElMessage.error(data.message);
                    }
                    console.log(this.emoImg)
                })
                this.emoDia = true;
            },

            //回复层面
            markReEmoImg(emo) {
                this.replyCommentText = this.replyCommentText + "![emo](" + emo + "){{{width=\"auto\" height=\"auto\"}}}";
                this.emoReDia = false;
            },
            getReEmoList() {
                axios({
                    url: "/leyuna/blog/getEmoticon",
                    method: "GET"
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.emoReImg = data.data;
                    } else {
                        ElMessage.error(data.message);
                    }
                    console.log(this.emoImg)
                })
                this.emoReDia = true;
            },

            goods(comment) {
                axios({
                    url: "/leyuna/tourist/goods",
                    method: "GET",
                    params: {
                        commentId: comment.id
                    }
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.$message.success("点赞成功");
                        comment.goods += 1;
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            closeReply(id) {
                this.isReply = "";
            },
            sumbitReplyComment(id, reName) {
                const blogId = this.$route.query.blogId;
                axios({
                    url: "/leyuna/tourist/commpent",
                    method: "POST",
                    data: {
                        content: this.replyCommentText,
                        name: this.subForm.name,
                        information: this.subForm.information,
                        blogId: blogId,
                        fatherCommentId: id,
                        respondent: reName,
                    }
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.$message.success("发布成功");
                        this.replyCommentText = "";
                        this.subForm.name = "";
                        this.subForm.information = "";
                        this.isReply = "";
                        this.comment();
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            openReply(id) {
                this.isReply = id;
                this.subForm.information = "";
                this.subForm.name = "";
                this.replyCommentText = "";
            },
            validator() {
                //校验空
                if (this.form.information == "") {
                    this.$notify({
                        title: '警告',
                        message: '有联系方式更方便哦',
                        type: 'warning'
                    });
                }
                if (this.commentText == "") {
                    this.valiValue = false;
                    this.$notify.error({
                        title: '错误',
                        message: '你想交空白卷吗',
                    });
                }
                if (this.form.name == "") {
                    this.valiValue = false;
                    this.$notify.error({
                        title: '错误',
                        message: '至少填个署名吧',
                    });
                }

                //校验值规则
                if (this.form.name.length > 30) {
                    this.valiValue = false;
                    this.$notify.error({
                        title: '错误',
                        message: '你是要写天书吗[指署名]',
                    });
                }
                if (this.commentText.length > 500 || this.replyCommentText.length > 500) {
                    this.valiValue = false;
                    this.$notify.error({
                        title: '错误',
                        message: '过了过了,字写多了！',
                    });
                }
                if (this.form.information.length > 50) {
                    this.valiValue = false;
                    this.$notify.error({
                        title: '错误',
                        message: '喂喂喂，太自由发挥了[指联系方式]',
                    });
                }
            },
            sumbitComment() {
                //校验
                this.validator();
                if (!this.valiValue) {
                    this.valiValue = true;
                    return false;
                }
                console.log(this.file)
                //如果游客上传了图片，则去文件服务器处理
                let formData = new FormData();
                formData.append('file', this.file);
                axios({
                    url: "/leyuna/server/tourist/upImg",
                    method: "POST",
                    processData: false, // 使数据不做处理
                    contentType: false,
                    dataType: 'json',
                    data: formData
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        const blogId = this.$route.query.blogId;
                        //添加本次评论
                        axios({
                            url: "/leyuna/tourist/commpent",
                            method: "POST",
                            data: {
                                content: this.commentText,
                                name: this.form.name,
                                commentHead: data.data,
                                information: this.form.information,
                                blogId: blogId,
                                ip: data.message
                            }
                        }).then((res) => {
                            var data = res.data;
                            if (data.status) {
                                this.valiValue = true;
                                this.$message.success("发布成功");
                                this.commentText = "";
                                this.form.name = "";
                                this.form.information = "";
                                this.query.pageTotal += 1;
                                this.commentList.splice(0, 0, data.data);
                            } else {
                                this.$message.error(data.message);
                            }
                        })
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                var data = res.data;
                if (data.status) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.file = file.raw;
                } else {
                    this.$message.error("别太频繁，明天再来换头像吧");
                    this.imageUrl = res.message;
                }
            },
            beforeAvatarUpload(file) {
                const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
                const whiteList = ["jpg", "png", "JPG", "PNG", "GIF", "gif"];
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (whiteList.indexOf(fileSuffix) === -1) {
                    this.$message.error('请上传图片类型文件');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
            },
            handlePageChange(val) {
                this.query.pageIndex = val;
                this.comment();
            },
            comment() {
                const blogId = this.$route.query.blogId;
                axios({
                    url: "/leyuna/tourist/comment/blog",
                    methods: "GET",
                    params: {
                        index: this.query.pageIndex,
                        size: this.query.pageSize,
                        blogId: blogId,
                        sortType: this.commentType
                    },
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.commentList = data.data.records;
                        this.query.pageTotal = data.data.total;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            },
            tabClick(tab, event) {
                this.nav();
            },
            nav() {
                if (this.ifNav) {
                    const anchors = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
                    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

                    if (!titles.length) {
                        this.titles = [];
                        return;
                    }

                    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

                    this.titles = titles.map((el) => ({
                        title: el.innerText,
                        lineIndex: el.getAttribute('data-v-md-line'),
                        indent: hTags.indexOf(el.tagName),
                    }));
                    this.ifNav = false;
                }
                let navDisplay = document.getElementById("nav-card").getAttribute("style");
                if (navDisplay.match('none')) {
                    document.getElementById("nav-card").setAttribute("style", "display:block");
                    document.getElementById("role-card").setAttribute("style", "display:none");
                } else {
                    document.getElementById("nav-card").setAttribute("style", "display:none");
                    document.getElementById("role-card").setAttribute("style", "display:block");
                }
            },
            thisBlog() {
                const blogId = this.$route.query.blogId;
                axios({
                    url: "/leyuna/blog/blog/" + blogId,
                    method: "GET",
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        let blog = data.data;
                        this.blogTitle = blog.title;
                        this.blogContent = blog.blogContent;
                        this.html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(this.blogContent));
                        this.remarks = blog.remarks;
                        this.createTime = blog.createTime;
                        this.updateTime = blog.updateTime;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            },
        },
        setup() {
            const handleAnchorClick = (anchor) => {
                const navItem = document.querySelector('.v-md-editor-preview');
                const {lineIndex} = anchor;
                const heading = document.querySelector(
                    `[data-v-md-line="${lineIndex}"]`);


                const top = heading.offsetTop;
                let timer = setInterval(() => {
                    if (document.querySelector('.main').scrollTop < top) {
                        document.querySelector('.main').scrollTop += 60;
                        if (document.querySelector('.main').scrollTop >= top - 60)
                            clearInterval(timer)
                    } else {
                        document.querySelector('.main').scrollTop -= 60
                        if (document.querySelector('.main').scrollTop <= top - 60)
                            clearInterval(timer)
                    }

                    console.log(document.querySelector('.main').scrollTop + "===" + top)
                }, 20)
            };
            return {
                handleAnchorClick,
            }
        },
    };
</script>

<style>
    @import "../static/css/Blog.css";
</style>
