<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>LeYuna</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="anime_container">

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
    @import "../static/css/My.css";
</style>
