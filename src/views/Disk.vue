<template>
    <el-button @click="openDisk" type="primary" style="margin-left: 16px;">
        LEYUNA-DISK
    </el-button>
    【云盘】
    <el-drawer
            title="LEYUNA-DISK"
            v-model="diskDrawer"
            size="35%"
            direction="rtl"
            :with-header="false">
        <div id="user_disk" v-if="user_disk">
            <el-progress style="margin-left:250px;margin-top:14px" type="circle"
                         :percentage="fileTotalSize">内存:{{this.fileTotalSize}}%
            </el-progress>
            <el-upload
                    class="upload-frame"
                    ref="upload"
                    :on-preview="handlePreview"
                    :http-request="upLoadFile"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    multiple="true"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
            <el-progress style="width: 400px" :stroke-width="24" v-if="show"
                         :percentage="percentage"></el-progress>

            <el-button size="small" style="margin: 10px;" type="success" @click="submitUpload">
                &nbsp上传&nbsp
            </el-button>
            <el-date-picker :disabled-date="publishDateAfter"
                            type="date" placeholder="保存时间" v-model="upLoadParam.saveTime"
                            value-format="YYYY-MM-DD"
                            style="margin-left:10px; width: 24%;"></el-date-picker>
            <el-tooltip class="item" effect="dark" content="选择保存时间：
                            到某年某日自动过期;未选择默认：永久保存" placement="bottom">
                <i style="font-size:24px" class="el-icon-bell">
                </i>
            </el-tooltip>
            <el-tabs v-model="default_fileList" @tab-click="tableClick">
                <el-tab-pane label="全部文件" name="0"></el-tab-pane>
                <el-tab-pane label="图片" name="1"></el-tab-pane>
                <el-tab-pane label="音频" name="2"></el-tab-pane>
                <el-tab-pane label="视频" name="3"></el-tab-pane>
                <el-tab-pane label="文档" name="4"></el-tab-pane>
                <el-tab-pane label="其他" name="5"></el-tab-pane>
                <el-empty v-if="myFile == undefined || myFile.length <= 0"
                          description="文件列表为空，请上传文件"></el-empty>
                <el-table v-else
                          :data="myFile"
                          border
                          fit="false"
                          max-height="540px"
                          style="margin-left: 10px;width: 650px">
                    <el-table-column
                            fixed
                            prop="name"
                            label="文件名"
                            width="180px">
                    </el-table-column>
                    <el-table-column
                            prop="fileTypeName"
                            label="文件类型"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="createDt"
                            label="上传时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="saveDt"
                            label="保存时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="fileSize"
                            label="文件大小(KB)"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            key="slot"
                            width="100">
                        <template #default='scope'>
                            <el-button @click="downFile(scope.row)" type="text" size="small">下载</el-button>
                            <el-button @click="deleteFile(scope.$index,scope.row)" type="text"
                                       style="color: red" size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tabs>
            <div class="page-card">
                <el-pagination background layout="prev, pager, next" :current-page="query.pageIndex"
                               :page-size="query.pageSize" :total="query.pageTotal"
                               @current-change="handlePageChange"></el-pagination>
            </div>
        </div>
    </el-drawer>
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
</template>
<script>
    import axios from "axios";
    import {ElMessage} from "element-plus";

    export default {
        data() {
            return {
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
                fileKey:"",
                orderType: 3,
                query: {
                    pageSize: 10,
                    pageTotal: 0,
                    pageIndex: 1,
                },
            }
        },
        methods: {
            //云盘相关
            tableClick(tab, event) {
                var fileType = tab.props.name;
                this.default_fileList = fileType;
                axios({
                    url: "/leyuna/disk/getDiskInfo",
                    method: "GET",
                    params: {
                        fileType: fileType,
                        type: this.orderType,
                        index: this.query.pageIndex,
                        size: this.query.pageSize
                    }
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.myFile = data.data.fileinfos.records;
                        this.query.pageTotal = data.data.fileinfos.total;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            },
            getSTime(val) {
                this.val = this.val.format("YYYY-MM-DD");
                alert(val)
                this.upLoadParam.saveTime = val;
            },
            publishDateAfter(time) {
                return time.getTime() <= Date.now();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            async before_upload(file) {
                let formData = new FormData();
                formData.append('file', file);
                const res = await axios({
                    url: "/leyuna/disk/requestSaveFile",
                    method: "POST",
                    async: false,
                    processData: false, // 使数据不做处理
                    contentType: false,
                    dataType: 'json',
                    data: formData
                })
                var data = res.data;
                if (data.status) {
                    var responseType = data.data.responseType;
                    if (responseType === 1) {
                        this.upLoadValiValue = 1;
                        this.fileKey = data.data.fileKey;
                    } else {
                        this.upLoadValiValue = 0;
                    }
                } else {
                    this.upLoadValiValue = -1;
                }
                // })
            },
            async upLoadFile(param) {
                var file = param.file;
                await this.before_upload(file);
                //上传文件
                var upLoadValiValue = this.upLoadValiValue;
                if (upLoadValiValue == 1) {
                    let formData = new FormData();
                    formData.append('file', file);
                    formData.append('saveTime', this.upLoadParam.saveTime);
                    formData.append('token',Cookies.get('name').loginId);
                    this.show = true;
                    axios({
                        url: "/disk/file/saveFile",
                        method: "POST",
                        processData: false, // 使数据不做处理
                        contentType: false,
                        dataType: 'json',
                        data: formData,
                        onUploadProgress: (progressEvent) => {
                            // onUploadProgress 文件上传时的函数   上传进度
                            this.percentage = Number(
                                ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0)
                            );
                        }
                    }).then(res => {
                        var data = res.data;
                        if (data.status) {
                            console.log(data);
                            this.percentage = 0;
                            ElMessage.success("上传成功");
                            this.myFile = data.data.fileinfos.records;
                            this.query.pageTotal = data.data.fileinfos.total;
                            this.fileTotalSize = data.data.fileTotalStr;
                        } else {
                            ElMessage.error(data.message);
                        }
                    })
                } else if (upLoadValiValue == 0) {
                    ElMessage.success("上传成功");
                } else {
                    ElMessage.error("UpLoadFile Error");
                }

            },
            submitUpload() {
                this.$nextTick(() => {
                    this.$refs.upload.submit()
                })
            },
            openDisk() {
                this.default_fileList = "0",
                    axios({
                        url: "/leyuna/disk/getDiskInfo",
                        method: "GET",
                        params: {
                            fileType: this.default_fileList,
                            type: this.orderType
                        }
                    }).then((res) => {
                        var data = res.data;
                        if (data.status) {
                            this.myFile = data.data.fileinfos.records;
                            this.query.pageTotal = data.data.fileinfos.total;
                            this.fileTotalSize = data.data.fileTotalStr;
                            this.user_disk = true;
                            this.login_user = false;
                        } else {
                            //用户未登陆，弹出登陆框
                            ElMessage.error(data.message);
                            this.login_user = true;
                        }
                    })
                this.diskDrawer = true;
            },
            deleteFile(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios({
                        url: "/leyuna/disk/deleteFile",
                        method: "GET",
                        params: {
                            fileId: row.id
                        }
                    }).then(res => {
                        var data = res.data;
                        if (data.status) {
                            this.myFile.splice(index, 1);
                            this.fileTotalSize = data.data;
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            ElMessage.error(data.message);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            downFile(row) {
                axios({
                    url: "/leyuna/disk/downFile",
                    method: "GET",
                    params: {
                        fileId: row.id
                    },
                    responseType: 'blob'
                }).then((res) => {
                    const filename = res.headers["content-disposition"];
                    const blob = new Blob([res.data]);
                    var downloadElement = document.createElement("a");
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = decodeURIComponent(filename.split("filename=")[1]);
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
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
                        //保存登录token
                        Cookies.set('token', data.data);
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
        }
    }
</script>
