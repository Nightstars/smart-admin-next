<template>
  <n-card :bordered="false" class="proCard">
    <div class="new-page">
      <a-spin :spinning="spinning" size="large" tip="Loading..." style="margin-top: 150px" />
      <div v-for="(item, index) in apps" :key="index">
        <a-row style="margin-top: 30px; padding-left: 20px">
          <a-col class="gutter-row" :span="6" :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <h3 style="text-align: left; padding-left: 10px; font-weight: bold; color: #ff9700">{{
              item.groupName
            }}</h3>
          </a-col>
        </a-row>

        <a-row :gutter="[16, 30]">
          <a-col
            class="gutter-row"
            :span="6"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="6"
            :xxl="4"
            v-for="(app, cindex) in apps[index].financesApps"
            :key="cindex"
          >
            <a :href="app.appPath" target="_blank">
              <div class="app-container">
                <div class="app">
                  <!--              <a-avatar-->
                  <!--                  :size="80"-->
                  <!--                  :src="item.icon"-->
                  <!--                  alt="S"-->
                  <!--                  class="margin-top-sm"-->
                  <!--              />-->
                  <p style="text-align: center; color: #fff; font-size: 36px; padding-top: 16px">{{
                    app.appName
                  }}</p>
                </div>
                <!--            <a-tag color="#2db7f5" class="margin-top">-->
                <!--              {{ item.name }}-->
                <!--            </a-tag>-->
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
  import { getAll } from '@/api/financecenter/financecenter';
  import { useMessage } from 'naive-ui';

  interface appDataType {
    groupName: string;
    financesApps: [
      {
        appName: string;
        appPath: string;
        appGroup: string;
      }
    ];
  }

  const apps = ref([] as appDataType[]);
  const message = useMessage();
  let spinning = ref(true);

  const params = {
    pageIndex: 1,
    pageSize: 100,
    name: '',
  };

  onMounted(async () => {
    const { success, msg, data } = await getAll(params);
    if (success) apps.value = data;
    else message.error(msg);
    spinning.value = false;
  });
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
