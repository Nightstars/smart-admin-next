<template>
  <div style="max-width: 1500px; width: 100%; background-color: blue; margin: 0 auto;">
    <div style="width: 100%; max-height: 843px; height: 843px; margin: 0 auto">
      <Artplayer @get-instance="getInstance" :option="option" :style="style" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Artplayer from '@/components/player/index.vue';
  import { onMounted, onUpdated, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getDetail } from '@/api/cinema/recommend';

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
  const videoInfo = ref<MoviesType>();
  const currentPlay = ref<string>();
  const movieDetail = ref([] as MoviesType[]);
  const option = reactive({
    url: router.currentRoute.value.query.url,
  });

  const style = ref({
    style: {
      width: '100%',
      height: '900px',
    },
  });

  onMounted(async () => {
    videoInfo.value = await getDetail(router.currentRoute.value.query.id);
    option.url = videoInfo.value?.vod_play[0].url;
    console.log(option.url);
  });

  onUpdated(() => {

  });

  function getInstance(art) {
    console.log(art);
  }
</script>

<style lang="less" scoped></style>
