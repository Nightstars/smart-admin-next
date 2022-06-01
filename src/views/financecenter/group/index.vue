<template>
  <div id="drawer-target">
    <n-card :bordered="false" class="proCard">
      <BasicForm @register="register" @submit="handleSubmit" />

      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        @update:checked-row-keys="onCheckedRow"
        :scroll-x="1090"
      >
        <template #tableTitle>
          <n-button type="primary" @click="addTable">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            新建
          </n-button>
        </template>

        <template #toolbar>
          <n-button type="primary" @click="reloadTable">刷新数据</n-button>
        </template>
      </BasicTable>

      <n-drawer
        v-model:show="visible"
        :width="502"
        :on-after-leave="onAfterLeave"
        to="#drawer-target"
      >
        <n-drawer-content :title="title" closable>
          <div>
            <n-card :bordered="false" class="mt-4 proCard" style="margin-top: 0">
              <n-grid cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
                <n-grid-item offset="0 s:0 m:0 l:0 xl:0 2xl:0">
                  <n-form
                    :label-width="80"
                    :model="formValue"
                    :rules="rules"
                    label-placement="left"
                    ref="formRef"
                    class="py-8"
                    :disabled="disabled"
                  >
                    <n-form-item
                      label="seqNo"
                      path="seqNo"
                      :show-label="false"
                      style="display: none"
                    >
                      <n-input v-model:value="formValue.seqNo" />
                    </n-form-item>
                    <n-form-item label="名称" path="name">
                      <n-input
                        v-model:value="formValue.name"
                        placeholder="输入名称"
                        :clearable="true"
                      />
                    </n-form-item>
                    <n-form-item label="地址" path="url">
                      <n-input
                        v-model:value="formValue.url"
                        placeholder="输入应用地址"
                        :clearable="true"
                      />
                    </n-form-item>
                    <n-form-item label="图标" path="icon">
                      <n-input
                        v-model:value="formValue.icon"
                        placeholder="输入图标地址"
                        :clearable="true"
                      />
                    </n-form-item>
                    <n-form-item label="权重" path="weight">
                      <n-input-number
                        v-model:value="formValue.weight"
                        placeholder="输入权重"
                        style="width: 100%"
                        :clearable="true"
                      />
                    </n-form-item>
                    <n-form-item label="标签" path="tag">
                      <n-input
                        v-model:value="formValue.tag"
                        placeholder="输入标签"
                        :clearable="true"
                      />
                    </n-form-item>
                    <n-form-item label="描述" path="summary">
                      <n-input
                        v-model:value="formValue.summary"
                        type="textarea"
                        placeholder="请输入描述"
                        :clearable="true"
                      />
                    </n-form-item>
                    <div style="margin-left: 80px">
                      <n-space>
                        <n-button :disabled="disabled" type="primary" @click="formSubmit"
                          >提交</n-button
                        >
                        <n-button :disabled="disabled" @click="resetForm">重置</n-button>
                      </n-space>
                    </div>
                  </n-form>
                </n-grid-item>
              </n-grid>
            </n-card>
          </div>
        </n-drawer-content>
      </n-drawer>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { h, reactive, ref, unref } from 'vue';
  import { FormItemRule, useDialog, useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { addApp, delApp, editApp, getApp, getPageData } from '@/api/financecenter/financegroup';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { TypeEnum } from '@/enums/TypeEnum';

  const schemas: FormSchema[] = [
    {
      field: 'appName',
      component: 'NInput',
      label: '应用名称',
      componentProps: {
        placeholder: '请输入应用名称',
      },
    },
  ];

  const message = useMessage();
  const dialog = useDialog();
  const actionRef = ref();

  const params = ref({});
  //抽屉是否可见
  const visible = ref<boolean>(false);
  //抽屉标题
  const title = ref<string>('应用管理');
  //抽屉状态改变
  const onAfterLeave = () => {
    reloadTable();
  };

  const rules = {
    name: {
      required: true,
      message: '请输入应用名称',
      trigger: 'blur',
    },

    url: {
      required: true,
      message: '请输入应用地址',
      trigger: 'blur',
    },
    icon: {
      required: true,
      message: '请输入应用图标地址',
      trigger: 'blur',
    },
    weight: [
      {
        required: true,
        validator(rule: FormItemRule, value: number) {
          if (!value) {
            return new Error('请输入权重');
          } else if (!/^\d*$/.test(value.toString())) {
            return new Error('权重应该为整数');
          }
          return true;
        },
        trigger: ['input', 'blur'],
      },
    ],
  };

  const formRef: any = ref(null);
  const disabled = ref<boolean>(false);
  let type: TypeEnum = TypeEnum.ADD;
  const defaultValueRef = () => ({
    seqNo: null,
    name: '',
    url: '',
    icon: '',
    summary: '',
    tag: '',
    weight: 1,
  });

  let formValue = reactive(defaultValueRef());

  const actionColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '详情',
            onClick: handleDetails.bind(null, record),
            type: 'info',
            ifShow: () => {
              return true;
            },
            auth: ['basic_list'],
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            type: 'warning',
            auth: ['basic_list'],
          },
          {
            label: '删除',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            type: 'error',
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['basic_list'],
          },
        ],
      });
    },
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function addTable() {
    title.value = '应用管理-新增';
    initForm(TypeEnum.ADD);
  }

  const loadDataTable = async (res) => {
    return await getPageData({ ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  async function handleDetails(record: Recordable) {
    title.value = '应用管理-详情';
    const { success, msg, data } = await getApp(record.seqNo);
    if (success) {
      initForm(TypeEnum.DETAILS, data);
    } else message.error(msg);
  }

  async function handleEdit(record: Recordable) {
    title.value = '应用管理-编辑';
    const { success, msg, data } = await getApp(record.seqNo);
    if (success) {
      initForm(TypeEnum.EDIT, data);
    } else message.error(msg);
  }

  async function handleDelete(record: Recordable) {
    dialog.error({
      title: '警告',
      content: '此操作将永久删除数据，确定要删除吗？',
      positiveText: '确定',
      negativeText: '我再想想',
      onPositiveClick: async () => {
        const result = await delApp(record.seqNo);
        if (result) {
          message.info('删除成功');
          reloadTable();
        } else {
          message.error('删除失败');
        }
      },
    });
  }

  function handleSubmit(values: Recordable) {
    params.value = values;
    reloadTable();
  }

  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        let result = null;
        switch (type) {
          case TypeEnum.ADD:
            result = await addApp(formValue);
            break;
          case TypeEnum.EDIT:
            result = await editApp(formValue);
            break;
        }

        if (result) {
          message.info('操作成功');
          resetForm();
          visible.value = false;
        }
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }

  function resetForm() {
    formRef.value.restoreValidation();
    disabled.value = false;
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }

  function initForm(formType: TypeEnum, data: any = null) {
    switch (formType) {
      case TypeEnum.ADD:
        disabled.value = false;
        visible.value = true;
        type = formType;
        formValue = Object.assign(unref(formValue), defaultValueRef());
        break;
      case TypeEnum.EDIT:
        formValue = Object.assign(unref(formValue), data ?? defaultValueRef());
        disabled.value = false;
        visible.value = true;
        type = formType;
        break;
      case TypeEnum.DETAILS:
        formValue = Object.assign(unref(formValue), data ?? defaultValueRef());
        disabled.value = true;
        visible.value = true;
        break;
    }
  }
</script>

<style scoped lang="less">
  @import url('index');
</style>
