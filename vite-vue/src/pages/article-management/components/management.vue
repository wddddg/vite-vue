<template>
  <el-table
    :data="tableData"
    height="calc(100% - 26px)"
    class="tableStyle"
    size="large"
  >
    <el-table-column
      prop="username"
      label="用户"
      :show-overflow-tooltip="true"
    />
    <el-table-column prop="title" label="标题" :show-overflow-tooltip="true" />
    <el-table-column
      prop="content"
      :show-overflow-tooltip="true"
      label="文章内容"
    />
    <el-table-column prop="img" label="首页图片">
      <template #default="scope">
        <el-image
          style="width: 40px; height: 40px"
          :src="`http://182.61.138.230:3002/uploads?img=${scope.row.img}`"
          fit="cover"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div> </template
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClick(scope.row, true)"
          >修改</el-button
        >
        <el-popconfirm
          title="您确定要删除吗?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="handleClick(scope.row, false)"
        >
          <template #reference>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <Dialog
    type="edit"
    :visible="visible"
    @close-dialog="changeDialog"
    :data="textInfo"
  ></Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { queryText, delText } from "../../../request/api";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import Dialog from "../../../components/Dialog.vue";

let tableData = ref([] as any[]);
let visible = ref<Boolean>(false);
let textInfo = ref({});

queryText(localStorage.id).then((res: any) => {
  tableData.value = [...res];
});

const changeDialog = (value: Boolean, value2: Boolean) => {
  visible.value = value;
  if (value2) {
    queryText(localStorage.id).then((res: any) => {
      tableData.value = [...res];
    });
  }
};

const handleClick = async (val: any, isdel: Boolean) => {
  if (isdel) {
    textInfo.value = val;
    visible.value = true;
  } else {
    await delText({
      userId: val.userId,
      textId: val.id,
      isadmin: localStorage.isadmin,
      img: val.img,
    }).then((res: any) => {
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
    queryText(2).then((res: any) => {
      tableData.value = [...res];
    });
  }
};
</script>

<style lang="less" scoped>
.tableStyle {
  width: 100%;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
</style>
