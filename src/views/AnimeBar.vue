<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>番剧</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="anime_container">
            <el-card  v-for="item in list" shadow="always" class="anime-card">
                <el-popover
                        placement="top-start"
                        title="标题"
                        width="200"
                        trigger="hover"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <el-button slot="reference">hover 激活</el-button>
                </el-popover>
            </el-card>

        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            };
        },
        mounted: function () {

        },
        methods: {},
    };
</script>

<style scoped>
    @import "../static/css/AnimeBar.css";
</style>
