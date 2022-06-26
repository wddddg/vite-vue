<template>
  <div class="menuDiv">
    <div class="realmName">wddxhz.xyz</div>
    <el-menu
      active-text-color="#1890ff"
      background-color="#001529"
      class="el-menu-vertical-demo"
      text-color="#fff"
      @open="handleOpen"
      :router="true"
      @close="handleClose"
      :default-openeds="['/article-management']"
    >
      <el-menu-item index="/list">
        <el-icon><icon-menu /></el-icon>
        <template #title><span>列表信息</span></template>
      </el-menu-item>
      <el-sub-menu index="/article-management">
        <template #title>
          <el-icon
            ><el-icon><EditPen /></el-icon
          ></el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/article-management/add">新建文章</el-menu-item>
        <el-menu-item index="/article-management/management"
          >用户文章列表管理</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item index="/user-list">
        <el-icon
          ><el-icon><Stamp /></el-icon
        ></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="/user-center">
        <el-icon
          ><el-icon><UserFilled /></el-icon
        ></el-icon>
        <template #title>个人中心</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Menu as IconMenu,
  EditPen,
  UserFilled,
  Stamp,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.menuDiv {
  background: #001529;
  height: calc(100% - 2px);
  border: 1px #001529 solid;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  max-height: 800px;
}
.realmName {
  color: #fff;
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
}
</style>