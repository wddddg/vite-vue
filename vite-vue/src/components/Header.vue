<template>
  <div class="headerBody">
    <div>
      <img :src="Logo" alt="" class="headerImg" />
    </div>
    <div>
      <div>
        <el-dropdown>
          <el-space size="large">
            <el-avatar :icon="UserFilled" :src="AvatarUrl" />
            <span class="el-dropdown-link">
              {{ username }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
          </el-space>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import Logo from "../assets/logo.png";
import { ElMessage } from "element-plus";
import { UserFilled, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

let username = ref("");
let AvatarUrl = ref("");

watch(
  () => router.currentRoute.value,
  () => {
    AvatarUrl.value = `http://182.61.138.230:3002/uploads?img=${localStorage.icon}`;
  }
);

const outLogin = () => {
  ElMessage({
    message: "退出成功",
    type: "success",
  });
  localStorage.clear();
  setTimeout(() => {
    router.push("/login");
  }, 1000);
};
onMounted(() => {
  if (document.querySelector(".el-popper__arrow")) {
    let popper_arrow = <HTMLElement>document.querySelector(".el-popper__arrow");
    popper_arrow.style.display = "none";
    let popper = <HTMLElement>document.querySelector(".el-popper");
    popper.style.width = "120px";
  }
  if (localStorage) {
    username.value = localStorage.username ? localStorage.username : "游客";
    AvatarUrl.value = `http://182.61.138.230:3002/uploads?img=${localStorage.icon}`;
  }
});
</script>

<style lang="less" scoped>
.headerBody {
  padding: 0px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headerImg {
  display: block;
  width: 80px;
  height: 64px;
  margin: 10px 0px;
}
.el-dropdown-link {
  line-height: 45px;
}
</style>