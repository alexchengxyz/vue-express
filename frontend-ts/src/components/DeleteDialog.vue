<script lang="ts" setup>
import { defineEmits, ref, withDefaults } from 'vue';

interface Props {
  data: {
    id: string;
    username: string;
  }
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    id: '',
    username: '',
  }),
});

const open = ref(false);
const emits = defineEmits(['submit', 'reset']);

/**
 * 切換彈窗
 */
const toggleDialog = () => {
  open.value = !open.value;

  if (!open.value) {
    emits('reset');
  }
};

// 傳出參數
defineExpose({
  toggleDialog,
});
</script>

<template lang="pug">
el-dialog(
  v-model="open"
  title="刪除會員"
  width="30%"
  :before-close="toggleDialog"
)
  span 確認是否刪除帳號 {{ props.data.username }} ?
  template(#footer)
    span.dialog-footer
      el-button(@click="toggleDialog") 取消
      el-button(type="primary" @click="emits('submit', props.data.id)") 確認
</template>
