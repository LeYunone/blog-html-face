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
                    v-for="item in list"
                    :width="300">
                <template #reference>
                    <el-card   shadow="always" class="anime-card">
                    </el-card>
                </template>
                <template #default>
                </template>
            </el-popover>

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
