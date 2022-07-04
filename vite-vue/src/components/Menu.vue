<template>
  <div class="menuDiv">
    <div class="realmName">wddxhz.xyz</div>
    <el-menu
      :active-text-color="textColor"
      background-color="#001529"
      class="el-menu-vertical-demo"
      text-color="#fff"
      :router="true"
      :default-openeds="['/article-management']"
      :default-active="currenPath"
    >
      <el-menu-item
        index="/list"
        @click="handle({ title: '列表信息', parent: '' })"
      >
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
        <el-menu-item
          index="/article-management/add"
          @click="
            handle({
              title: '新建文章',
              parent: '文章管理',
            })
          "
          >新建文章</el-menu-item
        >
        <el-menu-item
          index="/article-management/management"
          @click="
            handle({
              title: '用户文章列表管理',
              parent: '文章管理',
            })
          "
          >用户文章列表管理</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item
        index="/user-list"
        @click="
          handle({
            title: '用户管理',
            parent: '',
          })
        "
      >
        <el-icon
          ><el-icon><Stamp /></el-icon
        ></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item
        index="/user-center"
        @click="
          handle({
            title: '个人中心',
            parent: '',
          })
        "
      >
        <el-icon
          ><el-icon><UserFilled /></el-icon
        ></el-icon>
        <template #title>个人中心</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import {
  Menu as IconMenu,
  EditPen,
  UserFilled,
  Stamp,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
let currenPath = ref<String>(router.currentRoute.value.path);

let textColor = ref("#1890ff");

watch(
  () => router.currentRoute.value,
  (nv, ol) => {
    if (nv.fullPath === "/") {
      textColor.value = "#fff";
    } else {
      textColor.value = "#1890ff";
    }
  }
);

interface Provider {
  title: string;
  parent?: string;
}

const emit = defineEmits(["routeInfo"]);

const handle = (key: Provider) => {
  emit("routeInfo", key);
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