<script lang="ts" setup>
import { defineEmits, ref, watch, withDefaults } from 'vue';
import { cloneDeep } from 'lodash';
import type { FormInstance } from 'element-plus';

interface Props {
  data: {
    id: string;
    username: string;
    name: string;
    enable: boolean;
  }
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    id: '',
    username: '',
    name: '',
    enable: true,
  }),
});

// State
const form = ref({
  id: '',
  username: '',
  name: '',
  enable: true,
});
const open = ref(false);
const emits = defineEmits(['submit', 'reset']);
const formRef = ref<FormInstance>();

// 表單驗證
const rules = {
  username: [
    { required: true, message: '请输入後台帳號', trigger: 'change' },
    { min: 3, max: 10, message: '請輸入3~10字元', trigger: 'blur' },
  ],
};

/**
 * 切換彈窗
 */
const toggleDialog = () => {
  open.value = !open.value;

  if (!open.value) {
    emits('reset');

    if (!formRef.value) return;

    formRef.value.resetFields();
  }
};

/**
 * 重置表單
 */
const resetForm = () => {
  if (!formRef.value) return;

  formRef.value.resetFields();
};

/**
 * 送出資料
 */
const submit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (valid) {
      emits('submit', form.value);
    }
  });
};

watch(props, () => {
  form.value = cloneDeep(props.data);
});

// 傳出參數
defineExpose({
  toggleDialog,
});
</script>

<template lang="pug">
el-dialog(
  v-model="open"
  :title="props.data.id ? '編輯會員' : '新增會員'"
  width="30%"
  :before-close="toggleDialog"
)
  el-form(
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    status-icon
  )
    el-form-item(label="後台帳號" prop="username")
      el-input(v-model="form.username")

    el-form-item(label="後台暱稱" prop="name")
      el-input(v-model="form.name")

    el-form-item(v-if="props.data.id" label="啟/停用" prop="enable")
      el-switch(v-model="form.enable")
  template(#footer)
    span.dialog-footer
      el-button(@click="resetForm") 重置
      el-button(type="primary" @click="submit") 確認
</template>
