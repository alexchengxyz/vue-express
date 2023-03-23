<template>
    <el-result
      icon="warning"
      title="404"
      sub-title="Page Not Found"
      :class="$style['el-result']"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">
          Back
        </el-button>
      </template>
    </el-result>
</template>

<style module>
.el-result {
  height: 100%;
}
</style>