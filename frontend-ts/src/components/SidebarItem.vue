<template lang="pug">
el-aside(width="200px")
  el-menu(router default-active="1")
    el-menu-item(route="/" index="1")
      el-icon
        HomeFilled
      span 首頁
    el-menu-item(route="/users" index="2")
      el-icon
        UserFilled
      span 後台帳號管理
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
