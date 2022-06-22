<template>
  <n-space style="max-width: 1500px; width: 100%; margin: 0 auto">
    <n-layout has-sider v-for="item in movieDetail">
      <n-layout-sider content-style="padding: 24px;">
        <n-image
          :src="item.vod_pic"
          style="
            box-shadow: -2px 3px 2px #0000001f, 2px 3px 2px #0000001f, 0 -1px 2px #0000001f;
            border-radius: 7px;
          "
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header class="margin-25">
          <p style="font-size: 36px; font-weight: bold">{{ item.vod_name }}</p>
        </n-layout-header>
        <n-layout-content class="margin-25"> 类型：{{ item.vod_types }} </n-layout-content>
        <n-layout-content class="margin-25"> 导演：{{ item.vod_director }} </n-layout-content>
        <n-layout-content class="margin-25"> 主演：{{ item.vod_actors }} </n-layout-content>
        <n-layout-content class="margin-25"> 地区：{{ item.vod_area }} </n-layout-content>
        <n-layout-content class="margin-25"> 年份：{{ item.vod_year }} </n-layout-content>
        <n-layout-content class="margin-25"> 简介：{{ item.vod_summary }} </n-layout-content>
      </n-layout>
    </n-layout>
    <div v-for="item in movieDetail" style="margin: 0 auto">
      <n-button type="info" v-for="mov in item.vod_play" style="margin: 20px" @click="play(mov.url)">
        {{ mov.name }}
      </n-button>
    </div>
  </n-space>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getDetail } from '@/api/cinema/recommend';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  interface MoviesType {
    vod_id: string;
    vod_name: string;
    vod_pic: string;
    vod_tag: string;
    vod_director: string;
    vod_area: string;
    vod_year: string;
    vod_summary: string;
    vod_play: any;
    vod_types: [];
    vod_actors: [];
  }

  const movieDetail = ref([] as MoviesType[]);

  onMounted(async () => {
    const result = await getDetail(router.currentRoute.value.query.id);
    let data: any = [];
    data.push(result);
    movieDetail.value = data;
  });

  function play(url) {
    console.log(url);
    router.push({ name: 'Play', query: { id: movieDetail.value[0].vod_id,
        url: movieDetail.value[0].vod_play[0].url } });
  }
</script>

<style lang="less" scoped>
  @import 'index';
</style>
