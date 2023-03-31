<template>
  <el-aside width="200px">
    <el-menu router default-active="2">
      <el-menu-item route="/" index="1">
        <el-icon><HomeFilled /></el-icon>
        <span>首頁</span>
      </el-menu-item>
      <el-menu-item route="/users" index="2">
        <el-icon><UserFilled /></el-icon>
        <span>後台帳號管理</span>
      </el-menu-item>
    </el-menu>

    <!-- 自訂連結 -->
    <!-- <router-link custom to="/about" v-slot="{ href, navigate }">
      <el-link type="primary" :href="href" @click="navigate">關於我們</el-link>
    </router-link> -->
  </el-aside>
</template>

<style scoped>
.el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.el-menu {
  border-right: none;
}
</style>
