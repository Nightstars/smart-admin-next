<template>
  <div>
    <div style="margin: 10px auto; width: 90%; font-weight: bold; text-align: center">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </div>

    <div style="width: 90%; margin: 36px auto">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { h, ref, Component } from 'vue';
  import { RouterLink } from 'vue-router';
  import { NIcon } from 'naive-ui';
  import type { MenuOption } from 'naive-ui';
  import { Flame, LogoYoutube, Nutrition, HappySharp, Tv } from '@vicons/ionicons5';

  function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }

  const activeKey = ref<string>('recommend');

  const menuOptions: MenuOption[] = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Recommend',
            },
          },
          { default: () => '推荐' }
        ),
      key: 'recommend',
      icon: renderIcon(Flame),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Movie',
            },
          },
          { default: () => '电影' }
        ),
      key: 'movie',
      icon: renderIcon(LogoYoutube),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Serial',
            },
          },
          { default: () => '电视剧' }
        ),
      key: 'serial',
      icon: renderIcon(Nutrition),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Cartoon',
            },
          },
          { default: () => '动漫' }
        ),
      key: 'cartoon',
      icon: renderIcon(HappySharp),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'VarietyShow',
            },
          },
          { default: () => '综艺' }
        ),
      key: 'varietyShow',
      icon: renderIcon(Tv),
    },
  ];
</script>

<style lang="less" scoped>
  @import 'index';
</style>
