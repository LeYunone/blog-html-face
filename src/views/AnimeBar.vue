<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>番剧</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="anime_container">
            <el-popover
                    placement="left-start"
                    trigger="hover"
                    v-for="(item,index) in animeList"
                    :width="300">
                <template #reference>
                    
                    <el-card shadow="always" class="anime-card">
                        <span class="anime_title">{{index}}</span>
                        <el-image
                                style="width: 130px; height: 150px"
                                :src="item.blogCover"
                                fit="fill"></el-image>
                    </el-card>
                </template>
                <template #default>
                    
                </template>
            </el-popover>

        </div>
    </div>
</template>

<script>
    import {ElMessage, ElMessageBox} from "element-plus";

    export default {
        data() {
            return {
                animeList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
                    url: "/leyuna/blogs",
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
