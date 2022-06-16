<template>
  <div style="width: 177px; height: 246px" @click="showid(id)">
    <n-image
      style="width: 177px; height: 246px; border-radius: 7px"
      :src="props.src"
      width="177"
      height="246"
      object-fit="fill"
      preview-disabled="true"
      fallback-src="https://images.smartcloud.fun:3/images/2022/06/15/mmexport1655322808027.jpg"
    />
    <div
      style="
        text-align: center;
        width: 100%;
        height: 30px;
        z-index: 999;
        position: relative;
        border-radius: 0 0 7px 7px;
        background-color: rgba(0, 0, 0, 0.7);
        margin-top: -35px;
      "
    >
      <n-ellipsis
        style="max-width: 150px; font-weight: bold; font-size: 15px; color: white; padding-top: 3px"
      >
        {{ title }}
      </n-ellipsis>
    </div>
    <div style="margin-top: -240px; margin-left: 5px; position: relative; z-index: 999">
      <n-tag
        round
        size="small"
        :color="{ color: 'rgba(0,0,0,0.5)', textColor: 'white' }"
        :bordered="false"
      >
        {{ tag }}
      </n-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';
  import { string } from 'vue-types';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = defineProps({
    src: {
      type: string,
      default: '',
    },
    title: {
      type: string,
    },
    tag: {
      type: string,
      default: '高清',
    },
    id: {
      type: string,
    },
  });
  function showid(data) {
    router.push({ name: 'Detail', params: { id: data } });
  }
</script>

<style scoped></style>
