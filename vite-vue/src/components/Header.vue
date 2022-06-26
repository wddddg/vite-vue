<template>
  <div class="headerBody">
    <div>
      <img :src="Logo" alt="" class="headerImg" />
    </div>
    <div>
      <div>
        <el-dropdown>
          <el-space size="large">
            <el-avatar :icon="UserFilled" />
            <span class="el-dropdown-link">
              user
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
          </el-space>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Logo from "../assets/logo.png";
import { UserFilled, ArrowDown } from "@element-plus/icons-vue";
// const isCollapse = ref(true);
onMounted(() => {
  if (document.querySelector(".el-popper__arrow")) {
    let popper_arrow = <HTMLElement>document.querySelector(".el-popper__arrow");
    popper_arrow.style.display = "none";
    let popper = <HTMLElement>document.querySelector(".el-popper");
    popper.style.width = "120px";
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