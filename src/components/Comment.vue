<template>
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
                        right-toolbar="sync-scroll preview" v-model="commentText"
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
                    <v-md-editor :model-value="item.content" mode="preview"></v-md-editor>
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
                                right-toolbar="sync-scroll preview" v-model="replyCommentText"
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
                            <span class="comment-time">{{subItem.createDt}}</span>
                        </div>
                        <div class="comment-info">{{subItem.information}}</div>
                        <div class="comment-content">
                            <v-md-editor :model-value="subItem.content" mode="preview"></v-md-editor>
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
    import axios from "axios";
    import VueMarkdownEditor, {xss} from '@kangc/v-md-editor';

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
                commentList: [],
                commentType: 2,
                file: File,
                valiValue: true
            };
        },
        mounted: function () {
            this.comment(); //拿评论
        },
        methods: {
            //添加表情包到mark中
            markEmoImg(emo) {
                this.commentText = this.commentText + "![emo](" + emo + "){{{width=\"100\" height=\"100\"}}}";
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
                this.replyCommentText = this.replyCommentText + "![emo](" + emo + "){{{width=\"100\" height=\"100\"}}}";
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
                if (res.status) {
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
        }
    };
</script>

<style >
    .webKing {
        display: inline-block;
        margin-left: .5em;
        margin-right: .5em;
        padding: 0 .3em;
        border-radius: 3px;
        background: #3498db;
        color: #fff;
        font-size: 0.775em;
    }

    .this-icon {
        margin-left: 15px;
        width: 1rem;
        height: 1rem;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .this-icon:hover {
        background-color: #f6a5a5;
    }

    .length-count {
        color: crimson;
        padding: 7px;
        float: right;
    }

    .cancel-reply:hover {
        color: yellow;
    }

    .comment-time {
        float: right;
    }

    .reply:hover {
        color: #b3e19d;
    }

    .do-comment {
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100px;
        height: 100px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100px;
        height: 100px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        position: relative;
        top: 40px;
        font-size: 28px;
        text-align: center;
    }

    .avatar {
        display: block;
    }

    .page-card {
        text-align: center;
    }

    .comment-replay {
        padding-top: 9px;
        border-top: 2.4px solid #f6f6f6;
        display: flex;
    }

    .comment-content {
        padding-top: 20px;
        padding-bottom: 15px;
    }

    .comment-img {
        margin-right: .75em;
    }

    .comment {
        position: relative;
        display: flex;
        padding: .5em;
        box-sizing: content-box;
        line-height: 1.75;
    }

    .comment-head {
    }

    .comment-replay-card {
        flex: 1;
    }

    .comment-card {
        flex: 1;
        width: 0;
        padding-bottom: .5em;
        border-bottom: 1px dashed;
    }
</style>