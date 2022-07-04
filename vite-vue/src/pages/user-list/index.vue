<template>
  <el-card class="box-card">
    <div v-for="(o, index) in userData" :key="index" class="infinite-list">
      <div class="item">
        <el-avatar
          :src="`http://182.61.138.230:3002/uploads?img=${o.icon}`"
          fit="cover"
          :style="
            o.icon === null
              ? 'background-color: rgb(114, 101, 230)'
              : 'background-color: #fff'
          "
          >{{ o.username }}</el-avatar
        >
        <div class="username">
          <el-button link>{{ o.username }}</el-button>
        </div>
        <span class="usercontent">
          {{ `已发布过的文章${o.essayLength}篇` }}
        </span>
        <div class="setAdmin">
          <!-- v-if="currentisadmin" -->
          设置管理员：<el-switch
            v-model="o.isadmin"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            @click="clickSetAdmin(o)"
          />
        </div>
        <div class="delUser" v-if="currentisadmin">
          <el-button @click="adminDelUser(o)">删除用户</el-button>
        </div>
      </div>
      <el-divider />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { queryAllUser, delUser, setAdmin } from "../../request/api";
const userData = ref([] as any);
const currentisadmin = ref(localStorage.isadmin === "57");
const queryUser = () => {
  queryAllUser().then((res: any) => {
    res.data.map((item: any) => {
      item.isadmin = item.isadmin === "57" ? true : false;
    });
    userData.value = [...res.data];
  });
};
queryUser();

const adminDelUser = (val: any) => {
  delUser({ userId: val.id, isadmin: localStorage.isadmin }).then(
    (res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: "success",
          message: res.msg,
        });
        queryUser();
      } else {
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    }
  );
};

const clickSetAdmin = (val: any) => {
  if (val.isadmin) {
    setAdmin({ userId: val.id, isadmin: localStorage.isadmin }).then(
      (res: any) => {
        if (res.code === 200) {
          ElMessage({
            type: "success",
            message: res.msg,
          });
          queryUser();
        } else {
          ElMessage({
            type: "error",
            message: res.msg,
          });
          val.isadmin = false;
        }
      }
    );
  }
};
</script>

<style lang="less" scoped>
.item {
  font-size: 14px;
  display: flex;
  align-items: center;
  position: relative;
  .username {
    span {
      display: block;
    }
    margin-left: 10px;
  }
  .usercontent {
    position: absolute;
    top: 30px;
    left: 53px;
  }
  .setAdmin {
    position: absolute;
    right: 100px;
  }
  .delUser {
    position: absolute;
    right: 0;
  }
}

.el-avatar {
  font-size: 12px;
  text-align: center;
}
.box-card {
  width: 100%;
  height: calc(100% - 26px);
  overflow: auto;
}
</style>
