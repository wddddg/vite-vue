<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();

watch(
  () => router.currentRoute.value,
  (nv, ol) => {
    if (
      !localStorage.getItem("username") &&
      !localStorage.getItem("password")
    ) {
      if (
        router.currentRoute.value.path != "/login" &&
        router.currentRoute.value.path != "/register"
      ) {
        ElMessage({
          message: "您还没登录噢,前往登陆吧",
          type: "error",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1);
      }
    }
  }
);
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
