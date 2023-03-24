<script setup>
import { defineEmits, ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {
      id: '',
      username: '',
    },
  },
});

const open = ref(false)
const emits = defineEmits(['submit', 'reset']);

/**
 * 切換彈窗
 */
const toggleDialog = () => {
  open.value = !open.value;

  if (!open.value) {
    emits('reset');
  }
}

// 傳出參數
defineExpose({
  toggleDialog,
});
</script>

<template>
  <el-dialog
    title="刪除會員"
    width="30%"
    v-model="open"
    :before-close="toggleDialog"
  >
    <span>確認是否刪除帳號 {{  props.data.username  }} ?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggleDialog">取消</el-button>
        <el-button @click="emits('submit', props.data.id)" type="primary" >確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
