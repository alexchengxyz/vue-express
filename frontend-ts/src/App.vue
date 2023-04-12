<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <el-container>
    <RouterView name="Sidebar" />
    <RouterView name="Main" class="el-main" />
  </el-container>

  <RouterView />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

.el-main {
  min-height: 100vh;
}
</style>
