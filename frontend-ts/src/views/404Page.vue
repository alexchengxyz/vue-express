<template lang="pug">
el-result(
  icon="warning"
  title="404"
  sub-title="找不到頁面！"
  :class="$style['el-result']"
)
  template(#extra)
    el-button(type="primary" @click="$router.push('/')") 回到首頁
</template>

<style module>
.el-result {
  height: 100%;
}
</style>
