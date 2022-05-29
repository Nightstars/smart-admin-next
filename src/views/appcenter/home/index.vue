<template>
  <div class="new-page">
    <a-spin :spinning="spinning" size="large" tip="Loading..." style="margin-top: 150px" />
    <a-row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]">
      <a-col
        class="gutter-row"
        :span="6"
        :xs="8"
        :sm="6"
        :md="6"
        :lg="6"
        :xl="3"
        v-for="(item, idx) in apps"
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
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getAll } from '@/api/appcenter/appcenter';

  interface appDataType {
    name: string;
    icon: string;
    url: string;
  }

  const apps = ref([] as appDataType[]);
  let spinning = ref(true);

  const params = {
    pageIndex: 1,
    pageSize: 100,
    name: '',
  };

  onMounted(async () => {
    const result = await getAll(params);
    apps.value = result;
    spinning.value = false;
  });
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
