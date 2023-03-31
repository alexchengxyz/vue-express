<script setup>
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import request from '@/utils/request.js';
import DeleteDialog from '@/components/DeleteDialog.vue';
import EditDialog from '@/components/EditDialog.vue';

const initDialogData = {
  id: '',
  name: '',
  username: '',
  enable: true,
};

// State
const loading = ref(false);
const data = ref([]);
const dialogData = ref(initDialogData);
// pagination
const currentPage = ref(1);
const pageSize = ref(20);
const pageTotal = ref(0);
const sort = ref('');
const order = ref('');

// expose
const deleteDialogExpose = ref(null);
const editDialogExpose = ref(null);

/**
 * 取得後台帳號列表
 */
const getUserList = async () => {
  const qs = {};

  if ((currentPage.value !== 1) || (pageSize.value !== 20)) {
    qs.first_result = (currentPage.value -1) * pageSize.value;
    qs.max_result = pageSize.value;
  }

  if (order.value) {
    qs.sort = sort.value;
    qs.order = order.value;
  }

  loading.value = true;

  const out = await request('GET', '/api/v1/users/list', qs);

  if (out?.result === 'ok') {
    const newData = out.ret.map((d, index) => ({
      ...d,
      id: d._id,
      order: (qs.first_result || 0) + index +1,
      createdAt: dayjs(d.created_at).format('YYYY-MM-DD'),
    }));

    data.value = newData;
    pageTotal.value = out.pagination.total;
  }

  loading.value = false;
}

/**
 * 更新個人資料
 *
 * @param {object} qs 更動資料來源
 */
const updateUser = async (qs) => {
  const out = await request('PUT', `/api/v1/users/${qs.id}`, qs);

  if (out?.result === 'ok') {
    const newData = data.value.map((d) => {
      let userData = { ...d };

      if (d._id === out.ret._id) {
        userData = { ...d, ...out.ret }
      }

      return userData;
    });

    data.value = newData;
  }
}

/**
 * 更動停用
 *
 * @param {object} innerData 更新資料
 */
const onChangeEnable = (innerData) => {
  updateUser({
    id: innerData.id,
    enable: innerData.enable,
  });
}

/**
 * 刪除
 */
const openDeleteDialog = (innerData) => {
  dialogData.value = innerData;
  deleteDialogExpose.value.toggleDialog();
}

/**
 * 重置彈窗資料
 */
const resetDialogData = () => {
  dialogData.value = initDialogData;
}

/**
 * 刪除後台帳號
 *
 * @param {string} 使用者 ID
 */
const onDelete = async (id) => {
  const out = await request('DELETE', `/api/v1/users/${id}`);

  if (out?.result === 'ok') {
    getUserList();

    deleteDialogExpose.value.toggleDialog();
    resetDialogData();
  }
}

/**
 * 新增/編輯
 */
const openEditDialog = (innerData = {}) => {
  editDialogExpose.value.toggleDialog();

  if (!Object.keys(innerData).length) {
    dialogData.value = initDialogData;

    return;
  }

  dialogData.value = innerData;
}

/**
 * 送出更新資料
 *
 * @param {object} 變更資料來源
 */
const onSubmit = async (innerData) => {
  const { id, username, name, enable } = innerData;

  const qs = { username, name };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/v1/users/${id}` : '/api/v1/users';

  if (id) {
    qs.enable = enable;
  }

  const out = await request(method, url, qs);

  if (out?.result === 'ok') {
    getUserList();

    resetDialogData();
    editDialogExpose.value.toggleDialog();
  }
}

/**
 * 變更排序
 *
 * @param {{
 * newSort: string,
 * newOrder: string,
 * }} param -
 * - newSort: 排序欄位
 * - newOrder: 降冪或升冪
 */
const handleSort = ({ prop: newSort, order: newOrder }) => {
  sort.value = (newSort === 'createdAt') ? 'created_at' : newSort;
  order.value = newOrder ? newOrder.slice(0, -6) : '';

  if (currentPage.value === 1) {
    getUserList();

    return;
  }

  currentPage.value = 1;
}

watch([currentPage, pageSize], () => {
  if (((currentPage.value -1) * pageSize.value > pageTotal.value)) {
    return;
  }

  getUserList();
});

onMounted(() => {
  getUserList();
});

</script>

<template>
  <main>
    <h1>後台帳號管理</h1>
    <el-row>
      <el-col :span="24" align="right">
        <el-button plain type="primary" @click="openEditDialog()">新增會員</el-button>
      </el-col>
    </el-row>
    <el-table
      border
      :default-sort="{ prop: 'createAt', order: 'descending' }"
      v-loading="loading"
      :data="data"
      @sort-change="handleSort"
      style="width: 100%; margin-top: 1rem"
    >
      <el-table-column prop="order" label="序" width="80" align="center" />
      <el-table-column prop="createdAt" label="建立時間" width="180" sortable = "custom" />
      <el-table-column prop="username" label="後台帳號" width="180" />
      <el-table-column prop="name" label="後台暱稱" />
      <el-table-column prop="enable" label="啟/停用" width="80" align="center">
        <template #default="scope">
        <el-switch @change="onChangeEnable(scope.row)"  v-model="scope.row.enable"/>
      </template>
      </el-table-column>
      <el-table-column label="編輯" width="180" align="center">
        <template #default="scope">
          <el-button
            size="small"
            @click="openEditDialog(scope.row)"
          >
            編輯
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="openDeleteDialog(scope.row)"
          >
            刪除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      v-loading="loading"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[20, 30, 40, 50]"
      layout="sizes, prev, pager, next"
      :total="pageTotal"
    />

    <EditDialog
      ref="editDialogExpose"
      :data="dialogData"
      @reset="resetDialogData"
      @submit="onSubmit"
    />

    <DeleteDialog
      ref="deleteDialogExpose"
      :data="dialogData"
      @reset="resetDialogData"
      @submit="onDelete"
    />
  </main>
</template>
