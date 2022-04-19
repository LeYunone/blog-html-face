<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>番剧</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="anime_container">
            <ul>
                <i v-for="(item,index) in animeList">
                    <el-popover
                            placement="right-start"
                            trigger="hover"
                            :width="300">
                        <template #reference>
                            <el-card shadow="always" class="anime-card">
                                <a target="_blank" :href="'#/blog?blogId='+item.id">
                                    <el-image
                                            style="width: 130px; height: 150px"
                                            :src="item.blogCover"
                                            fit="fill"></el-image>
                                </a>
                                <span class="anime_title">{{item.title}}</span>
                                <a class="anime_link" target="_blank" :href="item.blogLink"  type="danger">魔法网站</a>
                            </el-card>
                        </template>
                        <template #default>
                            <v-md-editor :model-value="item.remarks" mode="preview"></v-md-editor>
                        </template>
                    </el-popover>
                </i>
            </ul>

        </div>
    </div>
</template>

<script>
    import {ElMessage, ElMessageBox} from "element-plus";
    import axios from "axios";

    export default {
        data() {
            return {
                animeList: [],
                animeCount: 0,
                form: {
                    index: 1,
                    size: 20
                }
            };
        },
        mounted: function () {
            this.getAnime();
        },
        methods: {
            getAnime() {
                axios({
                    url: "/leyuna/blog/blogs",
                    method: "GET",
                    params: {
                        index: this.form.index,
                        size: this.form.size,
                        blogType: 4
                    }
                }).then((res) => {
                    var data = res.data;
                    if (data.status) {
                        this.animeList = data.data.records;
                        console.log(this.animeList)
                        this.animeCount = data.data.total;
                    } else {
                        ElMessage.error(data.message);
                    }
                })
            }
        },
    };
</script>

<style scoped>
    @import "../static/css/AnimeBar.css";
</style>
