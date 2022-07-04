<template>
  <el-dialog :model-value="props.visible" :show-close="false" @close="closes">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">
          {{ props.type === "chak" ? "查看文章" : "修改文章" }}
        </h4>
        <el-button-group>
          <el-button
            type="primary"
            @click="updataData"
            v-if="props.type === 'edit'"
          >
            修改
          </el-button>
          <el-button type="danger" @click="closes"> 关闭 </el-button>
        </el-button-group>
      </div>
    </template>
    <Edits
      :type="props.type"
      :data="props.data"
      @updataUserText="updataData"
      ref="edit"
    ></Edits>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import Edits from "../pages/article-management/components/add.vue";

type Props = {
  type: String;
  visible: Boolean;
  data: Object;
};

const edit = ref([] as any);
const props:any = defineProps<Props>();


const emit = defineEmits(["closeDialog"]);

const closes = () => {
  emit("closeDialog", false);
};

const updataData = async () => {
  await edit.value!.updataUserText();
  emit("closeDialog", false, true);
};
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>