<template>
  <div>{{ title }}</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const title = ref<string>('推荐');
</script>

<style lang="less" scoped>
  @import 'index';
</style>
