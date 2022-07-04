<template>
  <div class="loginBody">
    <div class="loginDiv">
      <img :src="Logo" class="logoPng" alt="" />
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="large"
      >
        <el-form-item label-width="0" prop="username" v-if="isLogin">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="Avatar"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label-width="0" prop="password" v-if="isLogin">
          <el-input
            v-model="ruleForm.password"
            type="password"
            :show-password="true"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label-width="0" prop="username" v-if="!isLogin">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="Avatar"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label-width="0" prop="password" v-if="!isLogin">
          <el-input
            v-model="ruleForm.password"
            type="password"
            :show-password="true"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label-width="0" prop="checkPass" v-if="!isLogin">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            :show-password="true"
            :prefix-icon="Unlock"
            placeholder="请输入两次相同的密码"
          />
        </el-form-item>
        <el-form-item label-width="0" v-if="!isLogin">
          <router-link :to="{ path: '/login' }" style="text-decoration: none">
            <el-button type="primary" style="width: 100%" link>
              已有账号？前往登录
            </el-button>
          </router-link>
        </el-form-item>
        <el-form-item label-width="0" v-if="isLogin">
          <el-button
            type="primary"
            style="width: 100%"
            @click="submitForm(ruleFormRef, false)"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item label-width="0">
          <router-link
            :to="{ path: '/register' }"
            style="text-decoration: none; width: 100%"
            v-if="isLogin"
          >
            <el-button style="width: 100%">还没有账号？前往注册</el-button>
          </router-link>
          <el-button
            v-else
            type="primary"
            style="width: 100%"
            @click="submitForm(ruleFormRef, true)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { Avatar, Lock, Unlock } from "@element-plus/icons-vue";
import Logo from "../../assets/logo.png";
import { useRouter } from "vue-router";
import { login, register } from "../../request/api";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: "",
  password: "",
  checkPass: "",
});

const checkUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 3) {
    callback(new Error("请输入三位以上的用户名"));
  } else {
    if (ruleForm.username !== "") {
      callback();
    } else {
      callback(new Error("请输入用户名"));
    }
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "" || value.length < 6) {
    callback(new Error("请输入六位以上的密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次相同输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一样！"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (
  ruleFormRef: FormInstance | undefined,
  Booleans: Boolean
) => {
  if (!ruleFormRef) return;
  ruleFormRef.validate((valid) => {
    if (valid) {
      if (Booleans) {
        register(ruleForm).then((res: any) => {
          if (res.code === 200) {
            ElMessage({
              message: "注册成功",
              type: "success",
            });
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          } else {
            ElMessage({
              message: res.msg,
              type: "error",
            });
          }
        });
      } else {
        login(ruleForm).then((res: any) => {
          if (res.code === 200) {
            ElMessage({
              message: res.msg,
              type: "success",
            });
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("password", res.data.password);
            localStorage.setItem("icon", res.data.icon);
            localStorage.setItem("isadmin", res.data.isadmin);
            localStorage.setItem("id", res.data.id);
            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else {
            ElMessage({
              message: res.msg,
              type: "error",
            });
          }
        });
      }
    } else {
      return false;
    }
  });
};

type Props = {
  isLogin: Boolean;
};

defineProps<Props>();
</script>


<style lang="less" scoped>
.loginBody {
  width: 100vw;
  height: 100vh;
  .loginDiv {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .logoPng {
      transform: scale(0.7);
      display: block;
      margin: auto;
    }
    .el-form-item--large {
      margin-bottom: 18px !important;
    }
  }
}
</style>
