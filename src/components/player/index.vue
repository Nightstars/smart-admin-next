<template>
  <div style="width: 100%; height: 100%; margin: 0 auto; max-width: 1500px">
    <div ref="artRef" style="height: 100%; margin: 0 auto"></div>
  </div>
</template>

<script lang="ts" setup>
  import Artplayer from 'artplayer';
  import { defineProps, getCurrentInstance, onBeforeMount, onMounted, ref } from 'vue';
  import Hls from 'hls.js';
  import { getDetail } from "@/api/cinema/recommend";
  import { useRouter } from "vue-router";
  let instance: any = null;
  let currentInstance: any = null;
  const props = defineProps({
    option: {
      type: Object,
      required: true,
    },
  });
  const artRef = ref(null);
  onBeforeMount(() => {
    if (instance && instance.destroy) {
      instance.destroy(false);
    }
  });

  onMounted(() => {
    currentInstance = getCurrentInstance();

    if ((props.option.url ?? '') != '') {
      instance = new Artplayer({
        ...props.option,
        container: artRef.value,
        autoplay: true,
        muted: false,
        volume: 0.5,
        aspectRatio: true,
        playbackRate: true,
        setting: true,
        fullscreenWeb: true,
        fullscreen: true,
        playsInline: true,
        theme: '#23ade5',
        customType: {
          m3u8: function(video, url) {
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(url);
              hls.attachMedia(video);
            } else {
              const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
              if (canPlay === 'probably' || canPlay == 'maybe') {
                video.src = url;
              } else {
                instance.notice.show = 'Does not support playback of m3u8';
              }
            }
          },
        },
      });
    }

    //currentInstance.$emit('get-instance', instance);
  });
</script>

<style lang="less" scoped>

</style>
