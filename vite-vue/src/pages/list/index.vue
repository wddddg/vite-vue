<template>
  <Dialog
    type="chak"
    :visible="visible"
    @close-dialog="changeDialog"
    :data="textInfo"
  ></Dialog>
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
          @click="handleClick(scope.row)"
          >查看</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { queryText } from "../../request/api";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import Dialog from "../../components/Dialog.vue";

let tableData = ref([] as any[]);

let visible = ref<Boolean>(false);

let textInfo = ref<Object>({});

queryText().then((res: any) => {
  tableData.value = [...res];
});

const changeDialog = (value: Boolean) => {
  visible.value = value;
};

const handleClick = (val: any) => {
  textInfo.value = val;
  visible.value = true;
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
