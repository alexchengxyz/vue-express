<script setup>
import { defineEmits, ref, watch } from 'vue';
import { cloneDeep } from 'lodash';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {
      id: '',
      username: '',
      name: '',
      enable: true,
    },
  },
});

// State
const form = ref({
  id: '',
  username: '',
  name: '',
  enable: true,
});
const open = ref(false)
const emits = defineEmits(['submit', 'reset']);
const formRef = ref('');

// 表單驗證
const rules = {
  username: [
    { required: true, message: "请输入後台帳號", trigger: "change"},
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
    resetForm();
  }
}

/**
 * 重置表單
 */
const resetForm = () => {
  if (!formRef.value) return;

  formRef.value?.resetFields();
}

/**
 * 送出資料
 */
const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    if (valid) {
      emits('submit', form.value)
    }
  });
}

watch(props, () => {
  form.value = cloneDeep(props.data);
});

// 傳出參數
defineExpose({
  toggleDialog,
});

</script>

<template>
  <el-dialog
    :title="props.data.id ? '編輯會員' : '新增會員'"
    width="30%"
    v-model="open"
    :before-close="toggleDialog"
  >
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="後台帳號" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>

    <el-form-item label="後台暱稱" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item v-if="props.data.id" label="啟/停用" prop="enable">
      <el-switch v-model="form.enable" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="submit" type="primary" >確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
