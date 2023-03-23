<script setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs'
import request from '@/utils/request.js';

const data = ref([]);

// 取得列表資料
const getData = async () => {
  const out = await request('GET', '/api/v1/customer_service');

  if (out?.result === 'ok') {
    const newData = out.ret.map((d, index) => ({
      ...d,
      id: index +1,
      createdAt: dayjs(d.created_at).format('YYYY-MM-DD'),
    }));

    data.value = newData;
  }
}

// 更新增料
const updateData = async (qs) => {
  const out = await request('PUT', `/api/v1/customer_service/${qs.id}`, qs);

  if (out?.result === 'ok') {
    console.log('data', data.value)
    const newData = data.value.map((d) => {
      let innerData = { ...d };

      if (d._id === out.ret._id) {
        innerData = { ...d, ...out.ret }
      }

      return innerData;
    });

    data.value = newData;
  }
}

// 更動停用
function onChangeEnable(innerData) {
  updateData({
    id: innerData._id,
    enable: innerData.enable,
  });
}

onMounted(() => {
  getData();
});
</script>

<template>
  <main>
    <h1>後台帳號管理</h1>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="序" width="180" />
      <el-table-column prop="createdAt" label="建立時間" width="180" />
      <el-table-column prop="username" label="後台帳號" width="180" />
      <el-table-column prop="name" label="後台暱稱" />
      <el-table-column prop="enable" label="啟/停用">
        <template #default="scope">
        <el-switch @change="onChangeEnable(scope.row)"  v-model="scope.row.enable"/>
      </template>
      </el-table-column>>
  </el-table>
  </main>
</template>

<style>

</style>
