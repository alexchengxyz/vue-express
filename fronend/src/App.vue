<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <el-container>
    <RouterView name="Sidebar" />
    <RouterView name="Main" class="el-main" />
  </el-container>

  <RouterView />
</template>

<style scoped>
.el-main {
  min-height: 100vh;
}
</style>