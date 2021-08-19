<template>
    <div class="right-bar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "RightBar"
    }
</script>

<style scoped>
    .right-bar{
        width: 300px;
        height: 100%;
        border-color: red;
        border-width:1px;
        border-style: dashed;
        position: absolute;
        background-color: white;
        display: block;
        right: 28px;
        top: 40px;
        bottom: 40px;
        overflow-y: scroll;
    }
</style>