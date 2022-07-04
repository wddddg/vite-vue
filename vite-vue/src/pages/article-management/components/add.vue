<template>
  <div class="addHeader" v-if="props.type != 'chak' && props.type != 'edit'">
    <div class="title">新建</div>
    <div class="content">这是新建文章</div>
    <el-button class="addButton" type="primary" @click="submitUpload"
      >提交</el-button
    >
  </div>
  <div class="addBody">
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :limit="2"
      :on-change="handleExceed"
      :auto-upload="false"
      v-if="props.type != 'chak'"
      :show-file-list="showFileList"
    >
      <template #trigger>
        <el-button :icon="Upload">上传封面</el-button>
      </template>
    </el-upload>
    <el-image
      style="width: 200px; height: 200px"
      :src="url"
      :preview-src-list="srcList"
      :initial-index="1"
      fit="cover"
      v-if="props.type == 'chak' || (props.type == 'edit' && editUploadState)"
    />
    <el-input
      v-model="input"
      placeholder="标题"
      size="large"
      style="margin: 10px 0px 20px"
    />
    <div id="quill-editors"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineExpose } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import type { UploadInstance } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import { addText, updataText } from "../../../request/api";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const url = ref("");
const srcList = ref([]);

const addfiles = ref(null);
const input = ref("");
const html = ref("");
const content = ref("");
const showFileList = ref(true);
const editUploadState = ref(true);
const uploadRef = ref<UploadInstance>();
type Props = {
  type: String;
  data: Object;
};
type Propss = {
  title?: String;
  contentHTML?: String;
  id?: String;
  img?: String;
};

const props: any = defineProps<Props>();

const editorOption = {
  readOnly: false,
  theme: "snow",
  debug: "warn",
  placeholder: "请输入内容...",
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
        [{ list: "ordered" }, { list: "bullet" }], // 列表
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        [{ direction: "rtl" }], // 文本方向
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
        [{ font: [] }], // 字体
        [{ align: [] }], // 对齐方式
        ["clean"], // 清除字体样式
        // ['image', 'video'], // 上传图片、上传视频
      ],
    },
  },
};
let quill: any = null;
onMounted(() => {
  if (document.querySelector("#quill-editors")) {
    quill = new Quill("#quill-editors", editorOption);
    quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
      content.value = quill.getText();
      html.value = quill.root.innerHTML;
    });
  }
  watch(
    props,
    () => {
      if (props?.data) {
        input.value = props.data.title;
        document.querySelector(".ql-editor")!.innerHTML =
          props.data.contentHTML;
        url.value = `http://182.61.138.230:3002/uploads?img=${props.data.img}`;
      }
    },
    {
      immediate: true,
    }
  );
});

const handleExceed: UploadProps["onExceed"] = (files: any, fileList) => {
  if (fileList.length > 1) {
    fileList.splice(0, 1);
  }
  addfiles.value = files.raw;
  editUploadState.value = false;
};

const submitUpload = () => {
  const formData = new FormData();
  formData.append("avatar", addfiles.value!);
  formData.append("content", content.value);
  formData.append("userId", localStorage.getItem("id")!);
  formData.append("title", input.value);
  formData.append("username", localStorage.getItem("username")!);
  formData.append("contentHTML", html.value);
  addText(formData).then((res: any) => {
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
      input.value = "";
      uploadRef.value!.clearFiles();
      document.querySelector(".ql-editor")!.innerHTML = "";
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};

const updataUserText = () => {
  const formData = new FormData();
  formData.append("avatar", addfiles.value!);
  formData.append("content", content.value);
  formData.append("img", props.data.img);
  formData.append("userId", localStorage.getItem("id")!);
  formData.append("title", input.value);
  formData.append("contentHTML", html.value);
  formData.append("textId", props.data.id);
  updataText(formData).then((res: any) => {
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};

defineExpose({
  updataUserText,
});
</script>

<style lang="less" scoped>
.addHeader {
  display: flex;
  align-items: center;
  position: relative;
  line-height: 60px;
  .title {
    font-size: 26px;
    font-weight: 700;
    margin: 0px 20px;
  }
  .content {
    color: #00000073;
  }
  .addButton {
    position: absolute;
    right: 15px;
  }
}
.addBody {
  padding: 10px;
  #quill-editors {
    height: 300px;
  }
}
</style>
