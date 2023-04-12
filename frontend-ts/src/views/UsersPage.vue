<script lang="ts" setup>
import {
  onMounted,
  ref,
  watch,
  type Ref,
} from 'vue';
import dayjs from 'dayjs';
import useLoadingStore from '@/stores/loading';
import request from '@/utils/request';
import DeleteDialog from '@/components/DeleteDialog.vue';
import EditDialog from '@/components/EditDialog.vue';

interface DataObj {
  id: string
  username: string;
  name: string;
  enable: boolean;
  _id?: string,
  order?: number,
  created_at?: Date,
  createdAt?: Date,
}
interface Ret {
  _id?: string;
  username?: string;
  name?: string;
  enable?: boolean;
  created_at?: Date;
}
interface Data {
  id?: string;
  _id?: string;
  username?: string;
  name?: string;
  enable?: boolean;
  order?: number;
  created_at?: Date | string;
  createdAt?: Date | string;
}

const initDialogData: DataObj = {
  id: '',
  name: '',
  username: '',
  enable: true,
  _id: '',
  order: 0,
  created_at: new Date(),
  createdAt: new Date(),
};

const loadingStore = useLoadingStore();

// State
const data: Ref<Data[]> = ref([]);
const dialogData: Ref<DataObj> = ref(initDialogData);
// pagination
const currentPage = ref(1);
const pageSize = ref(20);
const pageTotal = ref(0);
const sort = ref('');
const order = ref('');

// expose
const deleteDialogExpose = ref<InstanceType<typeof DeleteDialog> | null>(null);
const editDialogExpose = ref<InstanceType<typeof EditDialog> | null>(null);

/**
 * 取得後台帳號列表
 */
const getUserList = async () => {
  interface Qs {
    first_result?: number;
    max_result?: number;
    sort?: string;
    order?: string;
  }
  interface Out {
    result?: string;
    ret?: Ret[];
    pagination?: {
      first_result: number;
      max_result: number;
      total: number;
    };
  }

  const qs: Qs = {};

  if ((currentPage.value !== 1) || (pageSize.value !== 20)) {
    qs.first_result = (currentPage.value - 1) * pageSize.value;
    qs.max_result = pageSize.value;
  }

  if (order.value) {
    qs.sort = sort.value;
    qs.order = order.value;
  }

  loadingStore.main = true;

  const out: Out = await request('GET', '/api/v1/users/list', qs);

  if (out?.result === 'ok') {
    const newData = (out.ret || [])?.map((d, index): Data => ({
      id: d?._id,
      _id: d?._id,
      username: d?.username,
      name: d?.name,
      enable: d?.enable,
      order: (qs.first_result || 0) + index + 1,
      created_at: dayjs(d?.created_at).format('YYYY-MM-DD') || new Date(),
      createdAt: dayjs(d?.created_at).format('YYYY-MM-DD') || new Date(),
    }));

    data.value = newData;
    pageTotal.value = out.pagination?.total || 0;
  }

  loadingStore.main = false;
};

/**
 * 更新個人資料
 * - qs: 更動資料來源
 */
const updateUser = async (qs: { id: string; enable: boolean; }) => {
  interface Out {
    result?: string;
    ret?: Data;
  }
  const out: Out = await request('PUT', `/api/v1/users/${qs.id}`, qs);

  if (out?.result === 'ok') {
    const newData = data.value.map((d) => {
      let userData = { ...d };

      if (d._id === out.ret?._id) {
        userData = { ...d, ...out.ret };
      }

      return userData;
    });

    data.value = newData;
  }
};

/**
 * 更動停用
 * - innerData: 更新資料
 */
const onChangeEnable = (innerData: { id: string; enable: boolean; }) => {
  updateUser({
    id: innerData.id,
    enable: innerData.enable,
  });
};

/**
 * 刪除
 */
const openDeleteDialog = (innerData: DataObj) => {
  dialogData.value = innerData;
  deleteDialogExpose?.value?.toggleDialog();
};

/**
 * 重置彈窗資料
 */
const resetDialogData = () => {
  dialogData.value = initDialogData;
};

/**
 * 刪除後台帳號
 * -id: 使用者 ID
 */
const onDelete = async (id: string) => {
  const out: { result?: string; } = await request('DELETE', `/api/v1/users/${id}`);

  if (out?.result === 'ok') {
    getUserList();

    deleteDialogExpose?.value?.toggleDialog();
    resetDialogData();
  }
};

/**
 * 新增/編輯
 */
const openEditDialog = (innerData: DataObj) => {
  editDialogExpose?.value?.toggleDialog();

  if (!innerData.id) {
    dialogData.value = initDialogData;

    return;
  }

  dialogData.value = innerData;
};

/**
 * 送出更新資料
 * -innerData: 變更資料來源
 */
const onSubmit = async (innerData: DataObj) => {
  const { id, username, name, enable } = innerData;

  const qs: {
    username?: string;
    name?: string;
    enable?: boolean;
  } = { username, name };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/v1/users/${id}` : '/api/v1/users';

  if (id) {
    qs.enable = enable;
  }

  const out: { result?: string; } = await request(method, url, qs);

  if (out?.result === 'ok') {
    getUserList();

    resetDialogData();
    editDialogExpose.value?.toggleDialog();
  }
};

/**
 * 變更排序
 * - newSort: 排序欄位
 * - newOrder: 降冪或升冪
 */
const handleSort = ({ prop: newSort, order: newOrder }: {
  prop: string;
  order: string;
}) => {
  sort.value = (newSort === 'createdAt') ? 'created_at' : newSort;
  order.value = newOrder ? newOrder.slice(0, -6) : '';

  if (currentPage.value === 1) {
    getUserList();

    return;
  }

  currentPage.value = 1;
};

watch([currentPage, pageSize], () => {
  if (((currentPage.value - 1) * pageSize.value > pageTotal.value)) {
    return;
  }

  getUserList();
});

onMounted(() => {
  getUserList();
});

</script>

<template lang="pug">
main
  h1 後台帳號管理
  el-row
    el-col(:span="24" align="right")
      el-button(type="primary" @click="openEditDialog(initDialogData)") 新增會員

  el-table(
    v-loading="loadingStore.main"
    border
    :default-sort="{ prop: 'createAt', order: 'descending' }"
    :data="data"
    style="width: 100%; margin-top: 1rem"
    @sort-change="handleSort"
  )
    el-table-column(prop="order" label="序" width="80" align="center")
    el-table-column(prop="createdAt" label="建立時間" width="180" sortable="custom")
    el-table-column(prop="username" label="後台帳號" width="180")
    el-table-column(prop="name" label="後台暱稱")
    el-table-column(prop="enable" label="啟/停用" width="80" align="center")
      template(#default="scope")
        el-switch(v-model="scope.row.enable" @change="onChangeEnable(scope.row)")
    el-table-column(label="編輯" width="180" align="center")
      template(#default="scope")
        el-button(size="small" @click="openEditDialog(scope.row)") 編輯
        el-button(
          size="small"
          type="danger"
          @click="openDeleteDialog(scope.row)"
        ) 刪除

  el-pagination(
    v-model:page-size="pageSize"
    v-model:current-page="currentPage"
    v-loading="loadingStore.main"
    background
    :page-sizes="[20, 30, 40, 50]"
    layout="sizes, prev, pager, next"
    :total="pageTotal"
  )

  EditDialog(
    ref="editDialogExpose"
    :data="dialogData"
    @reset="resetDialogData"
    @submit="onSubmit"
  )

  DeleteDialog(
    ref="deleteDialogExpose"
    :data="dialogData"
    @reset="resetDialogData"
    @submit="onDelete"
  )
</template>
