<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="header-right">
            <a class="el-icon-search"></a>
        </div>
    </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    setup() {
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        // 侧边栏折叠
        const collapseChage = () => {
            store.commit("handleCollapse", !collapse.value);
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                collapseChage();
            }
        });
        return {
            collapse,
            collapseChage,
        };
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: rgba(0,120,231,.5);
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header-right{
    float: right;
    padding: 0 50px;
    cursor: pointer;
    line-height: 70px;
}
.header-right a{
    display: inline-flex;
    border: none;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
.web-title{
    text-align: center;
    line-height: 70px;
}
.header-right a:hover{
    background-color: #E5F1FD;
    color:#1d90e6;
}
</style>
