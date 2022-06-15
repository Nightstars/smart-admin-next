<template>
  <div>
    <n-grid
      cols="2 s:3 m:4 l:5 xl:7 2xl:8"
      responsive="screen"
      :y-gap="30"
      :x-gap="0"
      style="max-width: 1500px; margin: 0 auto"
    >
      <n-grid-item v-for="item in movies" key="vod_id" class="light-green">
        <MovieCard :src="item.vod_pic" :title="item.vod_name" :tag="item.vod_tag" :id="item.vod_id"/>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { MovieCard } from '@/components/MovieItem';
  import { getRecommend } from '@/api/cinema/recommend';

  interface MoviesType {
    vod_cid: string;
    vod_id: string;
    vod_name: string;
    vod_pic: string;
    vod_version: string;
    vod_tag: string;
  }

  const movies = ref([] as MoviesType[]);

  const params = {
    type: 5,
  };

  onMounted(async () => {
    const result = await getRecommend(params);
    movies.value = result;
    console.log(result);
  });
</script>

<style lang="less" scoped>
  @import 'index';
</style>
