<template>
  <el-breadcrumb
    separator="/"
    style="margin-bottom: 10px"
    v-if="showHome"
    :key="1"
  >
    <el-breadcrumb-item :to="{ path: '/' }" :replace="true"
      ><el-icon><HomeFilled /></el-icon
    ></el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in currentBreadName?.breadcrumbName"
      :key="index"
    >
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <el-breadcrumb
    separator="/"
    style="margin-bottom: 10px"
    v-else="showHome"
    :key="2"
  >
    <el-breadcrumb-item :to="{ path: '/' }" :replace="true"
      ><el-icon><HomeFilled /></el-icon
    ></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { HomeFilled } from "@element-plus/icons-vue";
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let showHome = ref(true);

const routes = [
  {
    path: "/list",
    breadcrumbName: ["列表信息"],
  },
  {
    path: "/article-management",
    breadcrumbName: ["文章管理"],
  },
  {
    path: "/article-management/add",
    breadcrumbName: ["文章管理", "新建文章"],
  },
  {
    path: "/article-management/management",
    breadcrumbName: ["文章管理", "用户文章列表管理"],
  },
  {
    path: "/user-list",
    breadcrumbName: ["用户管理"],
  },
  {
    path: "/user-center",
    breadcrumbName: ["个人中心"],
  },
];
let currentBreadName = ref([] as any);
watch(
  () => router.currentRoute.value,
  (nv, ol) => {
    if (nv.fullPath === "/") {
      nextTick(() => {
        showHome.value = false;
      });
    } else {
      currentBreadName.value = routes.filter((item) => {
        return item.path === router.currentRoute.value.path;
      })[0];
      nextTick(() => {
        showHome.value = true;
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less">
</style>
