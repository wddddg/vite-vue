<template>
  <div class="userCenterBody">
    <div class="imgAction">
      <el-image
        style="width: 200px; height: 200px"
        :src="url"
        :initial-index="1"
        fit="cover"
      />
      <div style="display: flex; justify-content: space-around">
        <el-upload
          ref="upload"
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :on-change="handleExceed"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button>修改头像</el-button>
          </template>
        </el-upload>
        <el-button @click="dialogFormVisible = true">修改密码</el-button>
      </div>
    </div>
    <div class="content">
      <div class="title">文章展示：</div>
      <el-card class="box-card">
        <div v-for="(o, index) in userData" :key="index" class="infinite-list">
          <div class="item">
            <div class="username">
              <el-button link @click="chakText(o)">{{ o.title }}</el-button>
            </div>
          </div>
          <el-divider />
        </div>
        <el-empty
          description="您还没有上传文章噢，请去新建文章添加吧!"
          v-if="!userData.length"
        />
      </el-card>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" title="修改密码">
    <el-input
      autocomplete="off"
      size="large"
      placeholder="请输入旧密码"
      v-model="olPass"
    />
    <div style="margin: 10px 0px"></div>
    <el-input
      autocomplete="off"
      size="large"
      placeholder="请输入新密码"
      v-model="nlPass"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updataPsw">修改</el-button>
      </span>
    </template>
  </el-dialog>
  <Dialog
    type="chak"
    :visible="visible"
    @close-dialog="changeDialog"
    :data="textInfo"
  ></Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  queryText,
  updataAdminPassword,
  uploadsAvatar,
} from "../../request/api";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import { useRouter } from "vue-router";
import Dialog from "../../components/Dialog.vue";
const router = useRouter();
const url = ref("");
const userData = ref([] as any);
const dialogFormVisible = ref(false);
const olPass = ref("");
const nlPass = ref("");
const textInfo = ref({});
const visible = ref<Boolean>(false);

onMounted(() => {
  queryText(localStorage.id).then((res: any) => {
    userData.value = [...res];
  });
  url.value = `http://182.61.138.230:3002/uploads?img=${localStorage.icon}`;
});

const updataPsw = () => {
  updataAdminPassword({
    userId: localStorage.id,
    newPassword: nlPass.value,
    oldPassword: olPass.value,
  }).then((res: any) => {
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: res.msg + ",返回登录页重新登陆",
      });
      setTimeout(() => {
        router.push("/login");
        localStorage.clear();
      }, 1000);
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};

const handleExceed: UploadProps["onExceed"] = (files: any) => {
  const formData = new FormData();
  formData.append("avatar", files.raw);
  formData.append("userId", localStorage.id);
  formData.append("icons", localStorage.icon);
  uploadsAvatar(formData).then((res: any) => {
    if (res.code === 200) {
      localStorage.setItem("icon", res.data[0].icon);
      ElMessage({
        type: "success",
        message: res.msg,
      });
      router.push("/");
      setTimeout(() => {
        router.push("/user-center");
      }, 1);
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};

const changeDialog = (value: Boolean) => {
  visible.value = value;
};

const chakText = (val: any) => {
  visible.value = true;
  textInfo.value = val;
};
</script>

<style lang="less" scoped>
.userCenterBody {
  width: 100%;
  height: calc(100% - 26px);
  background-color: #fff;
  display: flex;
  padding: 10px;
  overflow: hidden;

  .imgAction {
    width: 200px;
    position: relative;
    top: 50%;
    transform: translate(0%, -50%);
    height: 270px;
    margin-right: 10px;
  }
  .content {
    width: 100%;
    padding: 10px 5px;
    .title {
      margin: 0px 5px 10px;
      font-size: 14px;
    }
    .box-card {
      width: 100%;
      height: calc(100% - 26px);
      overflow: auto;
    }
  }
}
</style>
