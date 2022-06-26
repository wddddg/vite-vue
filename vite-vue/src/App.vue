<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px" style="overflow: hidden"
          ><Menu></Menu
        ></el-aside>
        <el-container>
          <el-header>
            <Header />
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./components/Menu.vue";
import Header from "./components/Header.vue";
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.el-container {
  height: 100vh;
}
.common-layout {
  height: 100vh;
}
.el-header {
  padding: 0px !important;
  background: #fff;
  height: 74px;
}
.el-main {
  padding: 10px 40px;
  background: #f0f2f5;
}
</style>
