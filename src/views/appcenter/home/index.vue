<template>
  <n-card :bordered="false" class="proCard">
    <div class="new-page">
      <a-spin :spinning="spinning" size="large" tip="Loading..." style="margin-top: 150px" />
      <div v-for="(item, index) in apps" :key="index">
        <a-row style="margin-top: 30px; padding-left: 20px; margin-bottom: 15px">
          <a-col class="gutter-row" :span="6" :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <h2 style="text-align: left; padding-left: 10px; font-weight: bold; color: #ff9700">{{
              item.groupName
            }}</h2>
          </a-col>
        </a-row>

        <a-row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]">
          <a-col
            class="gutter-row"
            :span="6"
            :xs="8"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="3"
            v-for="(item, idx) in apps[index].apps"
            :key="idx"
          >
            <a :href="item.url" target="_blank">
              <div class="app-container">
                <div class="app">
                  <a-avatar :size="80" :src="item.icon" alt="S" class="margin-top-sm" />
                </div>
                <a-tag color="#2db7f5" class="margin-top">
                  {{ item.name }}
                </a-tag>
              </div>
            </a>
          </a-col>
        </a-row>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getAll } from '@/api/appcenter/appcenter';

  interface appDataType {
    groupName: string;
    apps: [
      {
        name: string;
        icon: string;
        url: string;
      }
    ];
  }

  const apps = ref([] as appDataType[]);
  let spinning = ref(true);

  const params = {
    pageIndex: 1,
    pageSize: 1000,
    name: '',
  };

  onMounted(async () => {
    const { list } = await getAll(params);
    apps.value = list;
    spinning.value = false;
  });
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
